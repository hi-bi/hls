import { PrismaDataServices } from './prisma-data-services.service';
import { PrismaService } from './prisma-client.service';
import { Prisma } from '@prisma/client'
import { User } from 'src/core';
import { ForbiddenException, HttpException, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';

export class PrismaUserRepository {
    
    public _service: PrismaDataServices;

    constructor(private prisma: PrismaService) {}
    
    getAll(): Promise<User[]> {
        return new Promise ((resolve, reject) => {

            this.prisma.dbUser.findMany()
            .then((res) =>{
                const items: User[] = [];
                res.forEach(el => {
                    const user: User = {
                        id: el.id,
                        login: el.login,
                        password: el.password,
                        version: el.version,
                        createdAt: new Number(el.createdAt) as unknown as number,
                        updatedAt: new Number(el.updatedAt) as unknown as number,
                    }

                    delete user.password;
                    items.push(user);
                });

                resolve(items);
            })
            .catch((err) => {
                reject(err);
            })
        })
    }

    async get(id: string) {

        try {
            const dbUser = await this.getDb(id);

            const user: User = {
                id: dbUser.id,
                login: dbUser.login,
                password: dbUser.password,
                version: dbUser.version,
                createdAt: new Number(dbUser.createdAt) as unknown as number,
                updatedAt: new Number(dbUser.updatedAt) as unknown as number,
            }

            delete user.password;
            
            return user;

        } catch (error) {
            throw new NotFoundException('User was not found');
        }
    }

    async getDb(id: string) {
        
        try {
            const dbUser = await this.prisma.dbUser.findUnique({
                where: {
                    id: id,
                }
            })
            
            if (dbUser == null) {
                throw new NotFoundException('User was not found');
            }

            return dbUser;

        } catch (error) {
            throw new NotFoundException('User was not found');
        }
    }


    async create (item: User) {
        try {
            const userId = v4();
            const createdAt = new Date().getTime();

            const dbUser = await this.prisma.dbUser.create({
                data: {
                    id: userId,
                    login: item.login,
                    password: item.password,
                    version: 1,
                    createdAt: new Prisma.Decimal(createdAt),
                    updatedAt: new Prisma.Decimal(createdAt),
                    refToken: '',
                }
            })
            
            const user: User = {
                id: dbUser.id,
                login: dbUser.login,
                password: dbUser.password,
                version: dbUser.version,
                createdAt: new Number(dbUser.createdAt) as unknown as number,
                updatedAt: new Number(dbUser.updatedAt) as unknown as number,
            }

            delete user.password;
            
            return user;

        } catch (error) {

        }
    }

    async update(id: string, user: User) {

        try {
            const oldUser = await this.getDb(id);

            const nPassChange = user.password.indexOf(' ');
            let newPassword = '';
            let oldPassword = '';

            if (nPassChange > 0) {
                newPassword = user.password.substring(0, nPassChange);
                oldPassword = user.password.substring(nPassChange+1);
            }

            if (oldUser.password != oldPassword) {
                throw new ForbiddenException('oldPassword is wrong');
            }

            oldUser.password = newPassword;
            oldUser.version ++;
            oldUser.updatedAt = new Prisma.Decimal(new Date().getTime());

            await this.prisma.dbUser.update({
                where: {
                    id: id,
                },
                data: {
                    password: oldUser.password,
                    version: oldUser.version,
                    updatedAt: oldUser.updatedAt,
                }
            })

            const updatedUser = new User({
                id: oldUser.id,
                login: oldUser.login,
                password: oldUser.password,
                version: oldUser.version,
                createdAt: new Number(oldUser.createdAt) as unknown as number,
                updatedAt: new Number(oldUser.updatedAt) as unknown as number,
            });

            delete updatedUser.password;

            return updatedUser;

        } catch (err) {
            const updateError = err as unknown as HttpException;

            if (updateError.getStatus() === 403){
                throw new ForbiddenException('oldPassword is wrong');
            }

            if (updateError.getStatus() === 404){
                throw new NotFoundException('User was not found');
            }

        }

    }

    async delete(id: string) {

        try {

            await this.prisma.dbUser.delete({
                where: {
                    id: id,
                }
            }) 
            
            return

        } catch (err) {
            throw new NotFoundException('Artist was not found');
        }
    }

}