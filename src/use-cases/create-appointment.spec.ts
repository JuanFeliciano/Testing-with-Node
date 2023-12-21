import { describe, expect, it } from 'vitest'
import { CreateAppointment } from './create-appointments'
import { Appointment } from '../entities/appointment'
import { getFutureDate } from '../tests/utils/get-future-date'

describe('Create Appointment', () => {
  it('Should be able to create an appointment', () => {
    const createAppointment = new CreateAppointment()

    const startsAt = getFutureDate('2023-09-04')
    const endsAt = getFutureDate('2023-09-05')

    expect(
      createAppointment.execute({
        customer: 'John Doe',
        startsAt,
        endsAt,
      }),
    ).resolves.toBeInstanceOf(Appointment)
  })
})
