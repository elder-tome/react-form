'use client'
import { Form } from "@/components/Form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

const createFormSchema = z.object({
  name: z.string()
    .nonempty('Nome obrigatório')
    .transform(name => {
      return name.trim()
        .split(' ')
        .map(word => word[0].toLocaleUpperCase().concat(word.substring(1)))
        .join(' ')
    }),
  user: z.string()
    .nonempty('Usuario obrigatório'),
  email: z.string()
    .nonempty('E-mail obrigatório')
    .email('Formato de e-mail invalido')
    .toLowerCase(),
  password: z.string()
    .nonempty('Senha obrigatória')
    .min(6, 'Senha com no mínimo 6 dígitos')
})

type CreateFormData = z.infer<typeof createFormSchema>

type Data = {
  status: number
  message: string,
  data: CreateFormData
}

export default function Login() {
  const [ loading, setLoading ] = useState(false)

  const createForm = useForm<CreateFormData>({
    resolver: zodResolver(createFormSchema)
  })

  const onSubmit: SubmitHandler<CreateFormData> = async(formData) => {
    setLoading(true)
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(formData)
    })
    const data = await response.json() as Data
    console.log(data)
    alert(data.message)
    setLoading(false)
  }

  return (
    <main className="flex h-screen p-4 bg-neutral-900 text-white justify-center items-center">
      <FormProvider {...createForm}>
        <Form.wrapper title="Criar Usuário" onSubmit={createForm.handleSubmit(onSubmit)}>
          <Form.input type="text" label="Nome" name="name" placeholder="Seu nome completo" />
          <Form.input type="text" label="Usuário" name="user" placeholder="Seu usuário" />
          <Form.input type="email" label="E-mail" name="email" placeholder="exemplo@email.com" />
          <Form.input type="password" label="Senha" name="password" placeholder="Sua senha" />
          <Form.button text="Criar" loading={loading}/>
        </Form.wrapper>
      </FormProvider>
    </main>
  )
}
