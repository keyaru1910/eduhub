import { contactSubmissionsRepository } from '../repositories/contact-submissions'
import type {
  ContactSubmissionInput,
  ContactSubmissionUpdateInput,
} from '@/types/backend'

export const contactSubmissionsService = {
  listAdmin: () => contactSubmissionsRepository.listAdmin(),
  create: (input: ContactSubmissionInput) => contactSubmissionsRepository.create(input),
  update: (id: string, input: ContactSubmissionUpdateInput) =>
    contactSubmissionsRepository.update(id, input),
}
