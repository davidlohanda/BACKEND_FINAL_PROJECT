const registerAuthRouter = require('./registerAuthRouter')
const loginRouter = require('./loginRouter')
const createAuctionRouter = require('./createAuctionRouter')
const bidderRouter = require('./bidderRouter')
const adminRouter = require('./adminRouter')

module.exports = {
    registerAuthRouter,
    loginRouter,
    createAuctionRouter,
    bidderRouter,
    adminRouter
}