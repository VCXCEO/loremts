const Pusher = require('pusher')

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  useTLS: true,
})

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const { channel, event: eventName, data } = JSON.parse(event.body)

  try {
    await pusher.trigger(channel, eventName, data)
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Event triggered successfully' }),
    }
  } catch (error) {
    console.error('Error triggering Pusher event:', error)
    return { statusCode: 500, body: 'Error triggering Pusher event' }
  }
}
