export const CAMPAIGN_STATUS = {
  ACCEPT: 'accept', //GREEN
  PENDING: 'pending', //GRAY
  REJECTED: 'rejected', //RED
  COMPLETED: 'completed', //BLUE
}

export const CAMPAIGN_STATUS_WITH_COLORS = [
  {
    label: 'accept',
    color: 'green',
    status: CAMPAIGN_STATUS.ACCEPT,
  },
  {
    label: 'pending',
    color: 'default',
    status: CAMPAIGN_STATUS.PENDING,
  },
  {
    label: 'rejected',
    color: 'red',
    status: CAMPAIGN_STATUS.REJECTED,
  },
  {
    label: 'completed',
    color: 'blue',
    status: CAMPAIGN_STATUS.COMPLETED,
  },
]
