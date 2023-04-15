const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const dbMiddleware = async (req, res, next) => {
  try {
    req.context = { prisma };
    await next();
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
    next(error);
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = dbMiddleware;