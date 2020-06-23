const express = require('express');
const router = express.Router();
const {  Flights } = require('../models/Flights');

router.post('/add_flights', (req, res)=>{
    const fly = new Flights(req.body);

    fly.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true,
            data: doc
        });
    });
})


router.post('/get_flights', (req, res)=>{
    console.log(req.body);
    let {
        origin,
        destination,
        originDate,
        destinationDate,
        page,
        pageLimit
    } = req.body;

    let endDate = destinationDate ? destinationDate : originDate;
    let pageNum = page || 1;
    let pageLimitNum = pageLimit || 5;

    var query =  { $and : [ 
        {source: origin}, 
        {destination: destination},
        {
            deptartureTime : {
                $gte:  new Date(new Date(originDate).setHours(00,00,00)),
                $lte:  new Date(new Date(endDate).setHours(23,59,59))
            }  
        }
    ]};

    var returnQuery =  { $and : [ 
        {source: destination}, 
        {destination: origin},
        {
            deptartureTime : {
                $gte:  new Date(new Date(destinationDate).setHours(00,00,00)),
                $lte:  new Date(new Date(destinationDate).setHours(23,59,59))
            }  
        }
    ]};

    if(destinationDate){
        Promise.all([
            Flights.find(query),
            Flights.find(returnQuery)
          ]).then( (results) => {
            
            var totalResult = results[0].concat(results[1])
            return res.status(200).json({
                success: true,
                data: totalResult,
                pagination: {
                    total: totalResult.length,
                    page : pageNum,
                    pageLimit : pageLimitNum
                }
            });
        });

    }else{
        Flights
        .find(
            { $and : [ 
                {source: origin}, 
                {destination: destination},
                {
                    deptartureTime : {
                        $gte:  new Date(new Date(originDate).setHours(00,00,00)),
                        $lte:  new Date(new Date(endDate).setHours(23,59,59))
                    }  
                }
            ]}
        ).sort({ deptartureTime: 1 })
        .skip((pageNum-1) * pageLimitNum)
        .limit(pageLimitNum)
        .exec((err, data)=>{
            if (err){
                return res.json({ success: false, err });
            }
            Flights.countDocuments(query).exec((count_error, count)=>{
                if (err) {
                    return res.json(count_error);
                }
                return res.status(200).json({
                    success: true,
                    data,
                    pagination: {
                        total: count,
                        page : pageNum,
                        pageLimit : pageLimitNum
                    }
                });
            })
        })
    }
      
   
})

module.exports = router;