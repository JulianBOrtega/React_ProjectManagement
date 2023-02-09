module.exports = (res, error, location) =>
{
    console.log(error);
    return res.status(error.status || 500).json({
        ok: false,
        msg: error.message || `Hubo un error${location ? 'en ' + location + '.' : '.'}`
    })
}