//import { UpdateUserDto } from 'src/core/dtos';
import { PrismaDataServices } from './prisma-data-services.service';
import { PrismaService } from './prisma-client.service';
import { Prisma, DbUser } from '@prisma/client'
import { User } from 'src/core';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
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
            const dbUser = await this.prisma.dbUser.findUnique({
                where: {
                    id: id,
                }
            })
            console.log('User get from db: ', dbUser);
            
            if (dbUser == null) {
                throw new NotFoundException('User was not found');
            }

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

    get1(id: string): Promise<User> {
        return new Promise ((resolve, reject) => {
            this.prisma.dbUser.findUnique({
                where: {
                    id: id,
                }
            })
            .then((res) => {
                console.log('User get from db: ', res);
                const user: User = {
                    id: res.id,
                    login: res.login,
                    password: res.password,
                    version: res.version,
                    createdAt: new Number(res.createdAt) as unknown as number,
                    updatedAt: new Number(res.updatedAt) as unknown as number,
                }
                delete user.password;
                resolve(user);
            })
            .catch((err) => {
                console.log('User get error: ', err);
                reject(new NotFoundException('User was not found'));
            })
        })
    }

    create(item: User): Promise<User> {
        return new Promise ((resolve, reject) => {
            const user = item;

            user.id = v4();
            user.version = 1;
            user.createdAt = new Date().getTime();
            user.updatedAt = user.createdAt

            this.prisma.dbUser.create({
                data: {
                    id: user.id,
                    login: user.login,
                    password: user.password,
                    version: user.version,
                    createdAt: new Prisma.Decimal(user.createdAt),
                    updatedAt: new Prisma.Decimal(user.updatedAt),
                }
            })
            .then((res) => {
                const user: User = {
                    id: res.id,
                    login: res.login,
                    password: res.password,
                    version: res.version,
                    createdAt: new Number(res.createdAt) as unknown as number,
                    updatedAt: new Number(res.updatedAt) as unknown as number,
                }
                delete user.password;
                resolve(user);
            })
            .catch((err) => {
                console.log('create user: ', err, item)
                reject(err);
            })
        })
    }

    async update(id: string, user: User) {

        try {
            console.log('User update: ', id, user, )
            const oldUser = await this.get(id);
            console.log('User update found: ', id, oldUser, )

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
            oldUser.updatedAt = new Date().getTime();

            const updatedDbUser = await this.prisma.dbUser.update({
                where: {
                    id: id,
                },
                data: {
                    id: oldUser.id,
                    password: oldUser.password,
                    version: oldUser.version,
                    updatedAt: oldUser.updatedAt
                }
            })

            const updatedUser = new User({
                id: updatedDbUser.id,
                login: updatedDbUser.login,
                password: updatedDbUser.password,
                version: updatedDbUser.version,
                createdAt: new Number(updatedDbUser.createdAt) as unknown as number,
                updatedAt: new Number(updatedDbUser.updatedAt) as unknown as number,
            });
            user.id = updatedUser.id

            delete updatedUser.password;

            return user;

        } catch (err) {
            console.log('User update not found: ', id, user, err)

            throw new NotFoundException('User with id does not exist')
        }

    }

    delete(id: string) {
        return new Promise ((resolve, reject) => {
            this.prisma.dbUser.delete({
                where: {
                    id: id,
                },
            })
            .then((res) => {
                resolve(true);
            })
            .catch((err) => {
                reject( new NotFoundException('User was not found'));
            })
        })
    }
    
}