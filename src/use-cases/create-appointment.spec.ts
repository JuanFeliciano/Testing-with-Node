import { describe, expect, it } from 'vitest'
import { CreateAppointment } from './create-appointments'
import { Appointment } from '../entities/appointment'
import { getFutureDate } from '../tests/utils/get-future-date'
import { InMemoryAppointmentsRepository } from '../repositories/in-memory/in-memory-appointment-repository'

describe('Create Appointment', () => {
  it('Should be able to create an appointment', () => {
    const startsAt = getFutureDate('2023-09-04')
    const endsAt = getFutureDate('2023-09-05')

    const appointmentsRepository = new InMemoryAppointmentsRepository()
    const createAppointment = new CreateAppointment(appointmentsRepository)

    expect(
      createAppointment.execute({
        customer: 'John Doe',
        startsAt,
        endsAt,
      }),
    ).resolves.toBeInstanceOf(Appointment)
  })

  it('Should not be able to create an appointment with overlapping dates', async () => {
    const startsAt = getFutureDate('2023-09-04')
    const endsAt = getFutureDate('2023-09-10')

    const appointmentsRepository = new InMemoryAppointmentsRepository()
    const createAppointment = new CreateAppointment(appointmentsRepository)

    await createAppointment.execute({
      customer: 'John Doe',
      startsAt,
      endsAt,
    })

    expect(
      createAppointment.execute({
        customer: 'John Doe',
        startsAt: getFutureDate('2023-09-09'),
        endsAt: getFutureDate('2023-09-12'),
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
