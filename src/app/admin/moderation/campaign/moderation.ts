export const MODERATION_STATUS = {
  ACCEPT: 'accept', //GREEN
  PENDING: 'pending', //GRAY
  REJECTED: 'rejected', //RED
  COMPLETED: 'completed', //BLUE
}

export const MODERATION_STATUS_WITH_COLORS = [
  {
    color: 'green',
    status: MODERATION_STATUS.ACCEPT,
  },
  {
    color: 'default',
    status: MODERATION_STATUS.PENDING,
  },
  {
    color: 'red',
    status: MODERATION_STATUS.REJECTED,
  },
  {
    color: 'blue',
    status: MODERATION_STATUS.COMPLETED,
  },
]
