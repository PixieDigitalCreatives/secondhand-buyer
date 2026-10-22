import {
  Buildings,
  ChatCircleText,
  ClipboardText,
  HandCoins,
  Tag,
  Truck,
  Wrench,
} from '@phosphor-icons/react'

export const sellSteps = [
  {
    icon: ChatCircleText,
    title: 'Share your AC details',
    text: 'Send the type, tonnage, age and a photo on WhatsApp, or simply call us.',
  },
  {
    icon: Tag,
    title: 'Get a fair price',
    text: 'We quote on type, tonnage, brand and condition. No obligation to sell.',
  },
  {
    icon: Truck,
    title: 'Free uninstall and pickup',
    text: 'Our team removes the indoor and outdoor units and takes them away.',
  },
  {
    // CONFIRM: payment at pickup.
    icon: HandCoins,
    title: 'Get paid',
    text: 'Payment is made at pickup, once you have agreed to the price.',
  },
]

export const commercialSteps = [
  {
    icon: ChatCircleText,
    title: 'Tell us about the site',
    text: 'Share the systems, number of units and location on a call or WhatsApp.',
  },
  {
    icon: ClipboardText,
    title: 'Site inspection',
    text: 'We visit, check the equipment and give you a price for the whole lot.',
  },
  {
    icon: Wrench,
    title: 'Dismantle and clear',
    text: 'Our crew removes units, piping and scrap on a schedule that suits you.',
  },
  {
    icon: Buildings,
    title: 'Handover',
    text: 'You get a cleared space and payment as agreed.',
  },
]
