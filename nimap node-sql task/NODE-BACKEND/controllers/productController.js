
var connection = require('../database/db');

const showProduct = (req, res) => {

    connection.query('SELECT * FROM products' , (err,rows)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send(rows);
        }
    })
}

const insertProduct =  (req, res) => {
    var pdt = req.body
    var pdtData = pdt.name
    var pdtId = pdt.catid
    connection.query('INSERT INTO products(name,catid) values(?,?)',[pdtData,pdtId ] , (err,rows)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send(rows);
        }
    })
}

const selectProductById =  (req, res) => {

     connection.query('SELECT * FROM products WHERE id=?' ,[req.params.id] , (err,rows)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send(rows);
        }
    })  
}

const updateProduct =  (req, res) => {
    const id= req.body.id;
    let pdt = req.body;

    var query = "UPDATE products SET name=?,catid=? WHERE id =?";
    connection.query(query,[pdt.name ,pdt.catid, id ],(err,results)=>{
        if(!err){
            if(results.affectedRows == 0){
                return res.status(404).json({msg:"product id does not exit"});
            }
            return res.status(200).json({msg:"product updated"});

        }
        else{
            return res.status(500).json(err);
        }
    })
   
}

const deleteProduct =  (req, res) => {
     connection.query('DELETE FROM products WHERE id=?' ,[req.params.id] , (err,rows)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send(rows);
        }
    })
}

const pagination =(req,res)=>{
    // console.log(req.params)
        const page = req.params.page || 1;
        const limit = req.params.limit || 10;
        const offset = (page - 1) * limit;
      
        const countQuery = 'SELECT COUNT(*) AS total FROM products';
        connection.query(countQuery, (error, countResult) => {
          if (error) {
            return res.status(500).json({ error: 'Error retrieving data.' });
          }
      
          const total = countResult[0].total;
      
          const dataQuery = `SELECT * FROM products LIMIT ${limit} OFFSET ${offset}`;
          connection.query(dataQuery, (error, dataResult) => {
            if (error) {
              return res.status(500).json({ error: 'Error retrieving data.' });
            }
      
            const totalPages = Math.ceil(total / limit);
            const response = {
              data: dataResult,
              meta: {
                total,
                totalPages,
                currentPage: page,
              },
            };
      
            res.json(response);
          });
        });
    
      
}

module.exports = {
    showProduct,
    insertProduct,
    updateProduct,
    selectProductById,
    deleteProduct,
    pagination
}