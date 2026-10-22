import { useId, useState } from 'react'
import { AnimatePresence, m } from 'motion/react'
import {
  ArrowLeft,
  ArrowRight,
  Buildings,
  CheckCircle,
  Minus,
  Phone,
  Plus,
  ShoppingBag,
  Tag,
  WhatsappLogo,
} from '@phosphor-icons/react'
import Button from '../ui/Button'
import { business, telHref, waHref } from '@/data/site'
import './QuoteWizard.scss'

const INTENTS = {
  sell: {
    label: 'Sell my old AC',
    hint: 'Working or not, any brand',
    icon: Tag,
    detailsTitle: 'Tell us about your AC',
    submit: 'Get my price',
  },
  buy: {
    label: 'Buy a used AC',
    hint: 'Window and split, 1 to 2 ton',
    icon: ShoppingBag,
    detailsTitle: 'What are you looking for?',
    submit: 'Check stock',
  },
  commercial: {
    label: 'Commercial or dismantling',
    hint: 'VRV, chillers, offices, hotels',
    icon: Buildings,
    detailsTitle: 'About the site',
    submit: 'Request a site visit',
  },
}

const OPTIONS = {
  sellType: ['Split', 'Window', 'Cassette', 'Tower', 'Ductable', 'VRV / VRF', 'Other'],
  buyType: ['Split', 'Window'],
  capacity: ['1 ton', '1.5 ton', '2 ton', '3 ton +', 'Not sure'],
  buyCapacity: ['1 ton', '1.5 ton', '2 ton', 'Not sure'],
  condition: ['Working', 'Not working'],
  system: ['VRV / VRF', 'Chiller or AC plant', 'Cassette / ductable', 'Rooftop AHU', 'Mixed'],
  site: ['Office', 'Hotel', 'Showroom', 'Factory', 'Other'],
}

const EMPTY = {
  type: '',
  capacity: '',
  condition: '',
  system: '',
  site: '',
  qty: 1,
  name: '',
  area: '',
}

function detailErrors(intent, d) {
  const e = {}
  if (intent === 'commercial') {
    if (!d.system) e.system = 'Pick the type of system.'
    if (!d.site) e.site = 'Pick the type of site.'
  } else {
    if (!d.type) e.type = 'Pick the AC type.'
    if (!d.capacity) e.capacity = 'Pick a capacity, or "Not sure".'
    if (intent === 'sell' && !d.condition) e.condition = 'Is it working?'
  }
  return e
}

function contactErrors(d) {
  const e = {}
  if (d.name.trim().length < 2) e.name = 'Please enter your name.'
  if (d.area.trim().length < 2) e.area = 'Please enter your area or sector.'
  return e
}

function buildMessage(intent, d) {
  const lines = {
    sell: [
      'Hi Suhan, I want to sell my AC.',
      `Type: ${d.type} AC`,
      `Capacity: ${d.capacity}`,
      `Condition: ${d.condition}`,
      `Quantity: ${d.qty}`,
    ],
    buy: [
      'Hi Suhan, I want to buy a used AC.',
      `Type: ${d.type} AC`,
      `Capacity: ${d.capacity}`,
      `Quantity: ${d.qty}`,
    ],
    commercial: [
      'Hi Suhan, I need a quote for commercial ACs / dismantling.',
      `System: ${d.system}`,
      `Site: ${d.site}`,
      `Approx. units: ${d.qty}`,
    ],
  }[intent]

  const closing = {
    sell: 'Please share your best price.',
    buy: 'What do you have in stock?',
    commercial: 'When can you visit the site?',
  }[intent]

  return [...lines, `Name: ${d.name.trim()}`, `Area: ${d.area.trim()}`, '', closing].join('\n')
}

function ChoiceGroup({ label, name, options, value, onChange, error }) {
  const errId = useId()
  return (
    <fieldset className="choice" aria-describedby={error ? errId : undefined}>
      <legend className="choice__legend">{label}</legend>
      <div className="choice__options">
        {options.map((opt) => (
          <label key={opt} className={`chip${value === opt ? ' is-active' : ''}`}>
            <input
              type="radio"
              name={name}
              value={opt}
              checked={value === opt}
              onChange={() => onChange(opt)}
            />
            {opt}
          </label>
        ))}
      </div>
      {error && (
        <p id={errId} className="field__error">
          {error}
        </p>
      )}
    </fieldset>
  )
}

function Stepper({ label, value, onChange }) {
  const id = useId()
  return (
    <div className="stepper">
      <span id={id} className="choice__legend">
        {label}
      </span>
      <div className="stepper__control" role="group" aria-labelledby={id}>
        <button
          type="button"
          onClick={() => onChange(Math.max(1, value - 1))}
          aria-label="Decrease"
          disabled={value <= 1}
        >
          <Minus weight="bold" size={16} />
        </button>
        <output className="tabular" aria-live="polite">
          {value}
        </output>
        <button
          type="button"
          onClick={() => onChange(Math.min(99, value + 1))}
          aria-label="Increase"
        >
          <Plus weight="bold" size={16} />
        </button>
      </div>
    </div>
  )
}

const slide = {
  enter: (dir) => ({ opacity: 0, x: dir * 24 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir * -24 }),
}

/**
 * Three short steps, then WhatsApp opens with every detail typed out.
 * No backend needed and the lead lands straight in the owner's chat.
 * Pass `intent` to skip the first question on pages that already know it.
 */
export default function QuoteWizard({ intent: fixedIntent, title, className = '' }) {
  const [intent, setIntent] = useState(fixedIntent ?? null)
  const [step, setStep] = useState(fixedIntent ? 1 : 0)
  const [dir, setDir] = useState(1)
  const [data, setData] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [sentUrl, setSentUrl] = useState(null)
  const nameId = useId()
  const areaId = useId()

  const steps = fixedIntent ? [1, 2] : [0, 1, 2]
  const position = steps.indexOf(step) + 1
  const cfg = intent ? INTENTS[intent] : null

  const set = (key) => (val) => {
    setData((d) => ({ ...d, [key]: val }))
    setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const go = (next) => {
    setDir(next > step ? 1 : -1)
    setErrors({})
    setStep(next)
  }

  const pickIntent = (key) => {
    setIntent(key)
    setData(EMPTY)
    go(1)
  }

  const nextFromDetails = () => {
    const e = detailErrors(intent, data)
    if (Object.keys(e).length) return setErrors(e)
    go(2)
  }

  const submit = (ev) => {
    ev.preventDefault()
    const e = contactErrors(data)
    if (Object.keys(e).length) return setErrors(e)
    const url = waHref(buildMessage(intent, data))
    window.open(url, '_blank', 'noopener,noreferrer')
    setSentUrl(url)
  }

  const reset = () => {
    setSentUrl(null)
    setData(EMPTY)
    setErrors({})
    setIntent(fixedIntent ?? null)
    setDir(-1)
    setStep(fixedIntent ? 1 : 0)
  }

  if (sentUrl) {
    return (
      <div className={`bezel ${className}`}>
        <div className="wizard bezel__core">
          <m.div
            className="wizard__done"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
          >
            <CheckCircle size={52} weight="fill" className="wizard__done-icon" aria-hidden="true" />
            <h3 className="h3">Your details are ready in WhatsApp</h3>
            <p className="muted">Press send in WhatsApp and we will reply with a price.</p>
            <div className="wizard__done-actions">
              <Button href={sentUrl} variant="wa" icon={WhatsappLogo} block>
                Open WhatsApp again
              </Button>
              <Button href={telHref} variant="outline" icon={Phone} block>
                Call {business.phoneShort}
              </Button>
            </div>
            <button type="button" className="wizard__link" onClick={reset}>
              Start a new request
            </button>
          </m.div>
        </div>
      </div>
    )
  }

  return (
    <div className={`bezel ${className}`}>
      <div className="wizard bezel__core">
        <div className="wizard__head">
          <div>
            <h2 className="wizard__title">{title ?? 'Get a price in 3 quick steps'}</h2>
            <p className="wizard__sub">
              Step {position} of {steps.length}
            </p>
          </div>
          {step > (fixedIntent ? 1 : 0) && (
            <button type="button" className="wizard__back" onClick={() => go(step - 1)}>
              <ArrowLeft size={16} weight="bold" aria-hidden="true" />
              Back
            </button>
          )}
        </div>

        <div
          className="wizard__progress"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={steps.length}
          aria-valuenow={position}
          aria-label="Form progress"
        >
          {steps.map((s, i) => (
            <span key={s} className={i < position ? 'is-done' : ''} />
          ))}
        </div>

        <div className="wizard__body">
          <AnimatePresence mode="wait" custom={dir} initial={false}>
            <m.div
              key={step}
              custom={dir}
              variants={slide}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              {step === 0 && (
                <div className="wizard__step">
                  <p className="wizard__question">What do you need?</p>
                  <div className="intent-list">
                    {Object.entries(INTENTS).map(([key, it]) => (
                      <button
                        key={key}
                        type="button"
                        className="intent"
                        onClick={() => pickIntent(key)}
                      >
                        <span className="intent__icon" aria-hidden="true">
                          <it.icon size={22} />
                        </span>
                        <span className="intent__text">
                          <strong>{it.label}</strong>
                          <span>{it.hint}</span>
                        </span>
                        <ArrowRight size={18} className="intent__arrow" aria-hidden="true" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 1 && cfg && (
                <div className="wizard__step">
                  <p className="wizard__question">{cfg.detailsTitle}</p>

                  {intent === 'commercial' ? (
                    <>
                      <ChoiceGroup
                        label="System"
                        name="system"
                        options={OPTIONS.system}
                        value={data.system}
                        onChange={set('system')}
                        error={errors.system}
                      />
                      <ChoiceGroup
                        label="Site"
                        name="site"
                        options={OPTIONS.site}
                        value={data.site}
                        onChange={set('site')}
                        error={errors.site}
                      />
                      <Stepper
                        label="Approx. number of units"
                        value={data.qty}
                        onChange={set('qty')}
                      />
                    </>
                  ) : (
                    <>
                      <ChoiceGroup
                        label="AC type"
                        name="type"
                        options={intent === 'buy' ? OPTIONS.buyType : OPTIONS.sellType}
                        value={data.type}
                        onChange={set('type')}
                        error={errors.type}
                      />
                      <ChoiceGroup
                        label="Capacity"
                        name="capacity"
                        options={intent === 'buy' ? OPTIONS.buyCapacity : OPTIONS.capacity}
                        value={data.capacity}
                        onChange={set('capacity')}
                        error={errors.capacity}
                      />
                      <div className="wizard__row">
                        {intent === 'sell' && (
                          <ChoiceGroup
                            label="Condition"
                            name="condition"
                            options={OPTIONS.condition}
                            value={data.condition}
                            onChange={set('condition')}
                            error={errors.condition}
                          />
                        )}
                        <Stepper label="How many" value={data.qty} onChange={set('qty')} />
                      </div>
                    </>
                  )}

                  <Button variant="dark" block iconRight={ArrowRight} onClick={nextFromDetails}>
                    Continue
                  </Button>
                </div>
              )}

              {step === 2 && cfg && (
                <form className="wizard__step" onSubmit={submit} noValidate>
                  <p className="wizard__question">Where should we contact you?</p>
                  <div className="field">
                    <label className="field__label" htmlFor={nameId}>
                      Your name
                    </label>
                    <input
                      id={nameId}
                      className="field__input"
                      autoComplete="name"
                      value={data.name}
                      onChange={(e) => set('name')(e.target.value)}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? `${nameId}-err` : undefined}
                    />
                    {errors.name && (
                      <p id={`${nameId}-err`} className="field__error">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div className="field">
                    <label className="field__label" htmlFor={areaId}>
                      Area or sector
                    </label>
                    <input
                      id={areaId}
                      className="field__input"
                      autoComplete="address-level3"
                      placeholder="e.g. Sector 62, Noida"
                      value={data.area}
                      onChange={(e) => set('area')(e.target.value)}
                      aria-invalid={Boolean(errors.area)}
                      aria-describedby={errors.area ? `${areaId}-err` : `${areaId}-help`}
                    />
                    {errors.area ? (
                      <p id={`${areaId}-err`} className="field__error">
                        {errors.area}
                      </p>
                    ) : (
                      <p id={`${areaId}-help`} className="field__help">
                        {intent === 'sell'
                          ? 'So we know where to pick up from.'
                          : 'Helps us plan the visit.'}
                      </p>
                    )}
                  </div>
                  <Button type="submit" variant="wa" block size="lg" icon={WhatsappLogo}>
                    {cfg.submit}
                  </Button>
                  <p className="wizard__note">
                    Opens WhatsApp with your details typed out. Prefer to talk?{' '}
                    <a href={telHref}>Call {business.phoneShort}</a>
                  </p>
                </form>
              )}
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
