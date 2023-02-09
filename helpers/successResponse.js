module.exports = (res, status = 200, msg = 'Success!', data = null) =>
{
    return res.status(status).json({
        ok: true,
        msg, status, data
    })
}