
const errorHandling = (err,req,res,next) => {
    console.log(`Terjadi Kesalahan Error: ${err.message}`)
    return res.status(500).json({message: 'Upps Something Wrong'})
}

export default errorHandling