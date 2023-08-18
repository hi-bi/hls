import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class NotificationsService {
@OnEvent('*.*')
    async notifyUncaughtException (payload: any) {
        console.log(`notifyUncaughtException: ${payload}`)
    }

@OnEvent('unhandledRejection')
    async notifyUnhandledRejection (payload: any) {
        console.log(`Hello user, ${payload.name} has been added to our menu. Enjoy.`)
    }

}
