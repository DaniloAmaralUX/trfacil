import { useMemo, useState } from 'react'
import { Copy, RefreshCcw, Sparkles, Wand2 } from 'lucide-react'
import { toast } from 'sonner'
import { sleep } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  type TRAIAction,
  type TRAISectionId,
  trAIActionLabels,
  trAISectionLabels,
  trAISuggestions,
} from '@/features/tr/data/tr-ai'

type TRAIAssistantProps = {
  section: TRAISectionId
  inputValue: string
  onApply: (value: string) => void
}

type RequestState = 'idle' | 'loading' | 'ready' | 'error'

export function TRAIAssistant({
  section,
  inputValue,
  onApply,
}: TRAIAssistantProps) {
  const [action, setAction] = useState<TRAIAction>('suggest')
  const [state, setState] = useState<RequestState>('idle')
  const [result, setResult] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const helperText = useMemo(() => {
    if (action === 'expand') {
      return 'Use quando já houver uma base escrita e você quiser ganhar densidade e detalhamento.'
    }

    if (action === 'rewrite') {
      return 'Use para melhorar clareza, tom institucional e padronização do texto.'
    }

    return 'Use para destravar a escrita inicial e acelerar o preenchimento da seção.'
  }, [action])

  async function handleGenerate(nextAction: TRAIAction) {
    setAction(nextAction)
    setState('loading')
    setErrorMessage('')

    await sleep(700)

    if (nextAction === 'expand' && inputValue.trim().length < 40) {
      setState('error')
      setResult('')
      setTitle('')
      setErrorMessage(
        'Adicione mais contexto na seção antes de pedir expansão. A simulação precisa de uma base mínima para funcionar.'
      )
      return
    }

    const suggestion = trAISuggestions[section][nextAction]
    setTitle(suggestion.title)
    setResult(suggestion.content)
    setState('ready')
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(result)
      toast.success('Sugestão copiada')
    } catch {
      toast.error('Não foi possível copiar o texto')
    }
  }

  return (
    <Card className='rounded-[24px] border-black/5 dark:border-white/10'>
      <CardHeader className='space-y-3'>
        <div className='inline-flex w-fit items-center gap-2 rounded-full border border-black/5 bg-muted/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary dark:border-white/10'>
          <Sparkles className='size-3.5' />
          Assistente mockado
        </div>
        <div className='space-y-1'>
          <CardTitle className='text-lg'>IA para {trAISectionLabels[section]}</CardTitle>
          <CardDescription>
            Experiencia simulada para validar a proposta de valor do produto.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className='space-y-4'>
        <Tabs
          value={action}
          onValueChange={(value) => void handleGenerate(value as TRAIAction)}
          className='gap-4'
        >
          <TabsList className='grid h-auto grid-cols-3 rounded-xl'>
            <TabsTrigger value='suggest' className='rounded-lg px-3 py-2'>
              Sugerir
            </TabsTrigger>
            <TabsTrigger value='rewrite' className='rounded-lg px-3 py-2'>
              Reescrever
            </TabsTrigger>
            <TabsTrigger value='expand' className='rounded-lg px-3 py-2'>
              Expandir
            </TabsTrigger>
          </TabsList>

          <TabsContent value={action} className='space-y-4'>
            <div className='rounded-2xl border border-dashed border-black/5 bg-muted/20 p-4 text-sm text-muted-foreground dark:border-white/10'>
              <div className='font-medium text-foreground'>
                {trAIActionLabels[action]}
              </div>
              <p className='mt-1 leading-6'>{helperText}</p>
            </div>

            <div className='flex flex-wrap gap-2'>
              <Button
                type='button'
                className='rounded-xl'
                onClick={() => void handleGenerate(action)}
                disabled={state === 'loading'}
              >
                {state === 'loading' ? (
                  <>
                    <RefreshCcw className='size-4 animate-spin' />
                    Gerando...
                  </>
                ) : (
                  <>
                    <Wand2 className='size-4' />
                    {trAIActionLabels[action]}
                  </>
                )}
              </Button>
            </div>

            {state === 'loading' ? (
              <div className='space-y-3 rounded-2xl border border-black/5 p-4 dark:border-white/10'>
                <Skeleton className='h-5 w-32' />
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-[92%]' />
                <Skeleton className='h-4 w-[78%]' />
              </div>
            ) : null}

            {state === 'error' ? (
              <div className='space-y-3 rounded-2xl border border-rose-200 bg-rose-50/80 p-4 text-sm dark:border-rose-900 dark:bg-rose-950/20'>
                <div className='font-medium text-rose-900 dark:text-rose-100'>
                  Não foi possível gerar a sugestão
                </div>
                <p className='leading-6 text-rose-800 dark:text-rose-200'>
                  {errorMessage}
                </p>
                <Button
                  type='button'
                  variant='outline'
                  className='rounded-xl'
                  onClick={() => void handleGenerate('suggest')}
                >
                  Tentar com sugestão inicial
                </Button>
              </div>
            ) : null}

            {state === 'ready' ? (
              <div className='space-y-4 rounded-2xl border border-black/5 bg-background p-4 shadow-sm dark:border-white/10'>
                <div className='space-y-1'>
                  <div className='font-medium'>{title}</div>
                  <p className='text-sm leading-7 text-muted-foreground whitespace-pre-line'>
                    {result}
                  </p>
                </div>
                <div className='flex flex-wrap gap-2'>
                  <Button
                    type='button'
                    className='rounded-xl'
                    onClick={() => {
                      onApply(result)
                      toast.success('Sugestão inserida no campo')
                    }}
                  >
                    Inserir no campo
                  </Button>
                  <Button
                    type='button'
                    variant='outline'
                    className='rounded-xl'
                    onClick={() => void handleCopy()}
                  >
                    <Copy className='size-4' />
                    Copiar
                  </Button>
                  <Button
                    type='button'
                    variant='ghost'
                    className='rounded-xl'
                    onClick={() => {
                      setState('idle')
                      setResult('')
                      setTitle('')
                    }}
                  >
                    Descartar
                  </Button>
                </div>
              </div>
            ) : null}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
