# Portfolio Website

A modern, responsive portfolio website for freelance services.

## Email Configuration

To enable the contact form functionality, you need to set up EmailJS:

1. Sign up for a free account at [EmailJS](https://www.emailjs.com/)
2. Create a new service (Gmail, Outlook, etc.)
3. Create an email template with the following variables:
   - `{{name}}` - Sender's name
   - `{{email}}` - Sender's email
   - `{{subject}}` - Email subject
   - `{{message}}` - Email message
4. Get your Service ID, Template ID, and Public Key
5. Create a `.env.local` file in the root directory with the following:

\`\`\`
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
\`\`\`

## Development

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev
\`\`\`

## Build

\`\`\`bash
# Build for production
npm run build

# Start production server
npm start
