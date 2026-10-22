import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { localeFromAcceptLanguage } from '@/lib/i18n'

// "/" redirige al idioma del navegador: inglés si lo prefiere, español en cualquier otro caso.
export default async function RootRedirect() {
  const acceptLanguage = (await headers()).get('accept-language')
  redirect(`/${localeFromAcceptLanguage(acceptLanguage)}`)
}
