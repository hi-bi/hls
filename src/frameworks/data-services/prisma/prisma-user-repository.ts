import { UpdateUserDto } from 'src/core/dtos';
import { PrismaDataServices } from './prisma-data-services.service';
import { PrismaService } from './prisma-client.service';
import { User } from '@prisma/client' 
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';

export class PrismaUserRepository {
    
    public _service: PrismaDataServices;

    constructor(private prisma: PrismaService) {}
    
    getAll(): Promise<User[]> {
        return new Promise ((resolve, reject) => {
            const allRec =  this.prisma.user.findMany()
            resolve(allRec);
        })
    }

    get(id: string): Promise<User> {
        return new Promise ((resolve, reject) => {
            const user = this.prisma.user.findUnique({
                where: {
                    id: id,
                }
            });

            if (user) resolve(user);
            else reject(new NotFoundException('User was not found'));
        })
    }

    create(item: User): Promise<User> {
        return new Promise ((resolve, reject) => {
            const user = item;

            user.id = v4();
            user.version = 1;
            user.createdAt = new Date().getTime();
            user.updatedAt = user.createdAt

            this.prisma.user.create({
                data: {
                    id: user.id,
                    login: user.login,
                    password: user.password,
                    version: user.version,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                }
            })

            delete user.password;
            
            resolve(item);
        })
    }

    update(id: string, item: any): Promise<User> {
        return new Promise ((resolve, reject) => {
            this.get(id)
            .then( user => {

                const newUser = item as unknown as User;
                const nPassChange = newUser.password.indexOf(' ');
                let newPassword = '';
                let oldPassword = '';

                if (nPassChange > 0) {
                    newPassword = newUser.password.substring(0, nPassChange);
                    oldPassword = newUser.password.substring(nPassChange+1);
                }
               
                const oldUser = user as unknown as User;

                if (oldUser.password != oldPassword) {
                    reject( new ForbiddenException('oldPassword is wrong'));
                }

                oldUser.password = newPassword;
                oldUser.version ++;
                oldUser.updatedAt = new Date().getTime();

                this.prisma.user.update({
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


                //this._repository.set(oldUser.id, oldUser as unknown as T);

                item = oldUser;
        
                delete oldUser.password;

               resolve(item);

            })
            .catch( error => {
                reject( new NotFoundException('User with id does not exist'));

            })
        })
    }

    delete(id: string) {
        return new Promise ((resolve, reject) => {
            const res = this.prisma.user.delete({
                where: {
                    id: id,
                },
            })

            if (res) {
                resolve(res);
            }
            else reject( new NotFoundException('User was not found'));
        })
    }
    
}