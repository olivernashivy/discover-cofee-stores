import { table, getMinifiedRecords } from "../../lib/airtable";

const CreateCoffeStores = async (req, res) => {
    if(req.method === 'POST') {
        
            try {
            const {
                id,
                name,
                address,
                neighbhood,
                voting,
                imgUrl
            } = req.body;
            if(id){
            const findCoffeeStoreRecords = await table
              .select({
                filterByFormula: `id='${id}'`,
              })
              .firstPage();
      
      
            if (findCoffeeStoreRecords.length !== 0) {
              const records = getMinifiedRecords(findCoffeeStoreRecords);
              res.json(records);
            } else {
              //create a record
              try {
                  const createdRecords =  await table.create([
                    {
                      fields: {
                        id,
                        name,
                        address,
                        neighbhood,
                        voting,
                        imgUrl,
                      },
                    },
                  ]);

                  res.statusCode = 200;
                  res.json({msg: 'Record created successfully'});
              } catch (err) {
                  console.log(err);
                  res.json({msg: 'Something went wrong'});
              }

              res.json({ message: "create a record" });
        }
    }
    else {
        res.json({msg: 'Id is required'});
    }
    
        
           
        
          } catch (err) {
            console.error("Error finding store", err);
            res.status(500);
            res.json({ message: "Error finding store", err });
          }
        
    }
   

    else {
        res.json({msg: 'Method not allowed'});
    }
}
   


export default CreateCoffeStores;