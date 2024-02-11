import { PrismaClient } from "@prisma/client";

if( ! global.prisma){
    global.prisma = new PrismaClient()
}
const prisma = global.prisma;

export default prisma ;