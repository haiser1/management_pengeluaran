
export const errorHandling = (err, req, res, next) => {
    console.log(`Error: ${err.message}`)
    return res.status(500).json({message: 'Upps Something Wrong in Server'})
}
