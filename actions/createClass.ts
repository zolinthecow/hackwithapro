'use server'

import PrismaClient from '@prisma/client';
import prisma from "@/prisma";
import { ulid } from 'ulid';

export type ClassData = {
  className: string;
  time: string;
  days: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
  },
  location: {
    name: string;
    lat: string;
    lng: string;
  }
}

const dayOfWeekMap = {
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
};

const createClass = async (classData: ClassData) => {
  await prisma.class.create({
    data: {
      id: ulid(),
      name: classData.className,
      location: {
        create: {
          id: ulid(),
          lat: classData.location.lat,
          lng: classData.location.lng,
        }
      },
      classTimes: {
        create: Object.entries(classData.days).filter(([k, v]) => v).map(([k, v]) => ({
          id: ulid(),
          startTime: classData.time,
          // @ts-expect-error its okay
          dayOfWeek: dayOfWeekMap[k],
        })),
      },
    },
  });
}

export default createClass;
