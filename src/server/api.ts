import { NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import { AppError, internalError, isAppError } from './errors'
import type { ApiResponse } from '@/types/backend'

export const successResponse = <T>(data: T, status = 200) =>
  NextResponse.json<ApiResponse<T>>({ success: true, data }, { status })

export const errorResponse = (message: string, status = 400, code?: string) =>
  NextResponse.json<ApiResponse<never>>({ success: false, error: message, code }, { status })

const mapPrismaError = (error: Prisma.PrismaClientKnownRequestError) => {
  if (error.code === 'P2002') {
    return new AppError('Du lieu bi trung voi ban ghi da ton tai.', 409, 'UNIQUE_CONSTRAINT')
  }

  if (error.code === 'P2025') {
    return new AppError('Khong tim thay ban ghi.', 404, 'NOT_FOUND')
  }

  return internalError()
}

export const normalizeError = (error: unknown) => {
  if (isAppError(error)) {
    return error
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return mapPrismaError(error)
  }

  if (error instanceof Error) {
    return internalError()
  }

  return internalError()
}

export const errorResponseFrom = (error: unknown, fallbackMessage = 'Request failed') => {
  const normalized = normalizeError(error)
  const message =
    normalized.status >= 500 && normalized.message === 'Internal server error'
      ? fallbackMessage
      : normalized.message

  return errorResponse(message, normalized.status, normalized.code)
}
