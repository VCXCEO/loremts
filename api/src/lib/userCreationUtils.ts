import crypto from 'crypto'

import sgMail from '@sendgrid/mail'

function generateRandomPassword(length = 16) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+'
  const buffer = crypto.randomBytes(length)
  let password = ''

  for (let i = 0; i < length; i++) {
    password += characters[Math.floor((buffer[i] / 256) * characters.length)]
  }

  return password
}

export const randomPassword = generateRandomPassword()
console.log(randomPassword)

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export async function sendTemplateMail(options: {
  to: string
  templateId: string
  dynamicTemplateData?: { [key: string]: any }
}) {
  const { to, templateId, dynamicTemplateData } = options

  const msg = {
    to,
    from: process.env.EMAIL_FROM,
    templateId,
    dynamic_template_data: dynamicTemplateData,
  }

  try {
    await sgMail.send(msg)
  } catch (error) {
    console.error(error)
    if (error.response) {
      console.error(error.response.body)
    }
    throw error
  }
}
