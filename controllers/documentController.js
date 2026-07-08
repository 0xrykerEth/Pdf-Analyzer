export async function documentController(req,res){
    const {documentId} = req.params;

    try{

        console.log(documentId);
        res.json(documentId)

    }catch(err){
        console.log(err)
        res.status(400).json('Document couldnt be deleted right now try again later')
    }
}