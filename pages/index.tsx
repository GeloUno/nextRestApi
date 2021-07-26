import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { Fragment, useRef, useState } from 'react'
import { IFeedbackData } from './api/feedback';
import { URL_FEEDBACK } from './feedback';
import Link from 'next/link';

export default function HomePage() {

  const [feedback, setFeedback] = useState<Array<IFeedbackData> | null>(null)

  const emailInputRef = useRef<HTMLInputElement>(null)
  const feedbackInputRef = useRef<HTMLTextAreaElement>(null)

  const submitFormHandler: React.FormEventHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (emailInputRef.current?.value && feedbackInputRef.current?.value) {
      const email = emailInputRef.current.value
      const feedback = feedbackInputRef.current.value

      const reqBody = { email: email, text: feedback }

      fetch(URL_FEEDBACK, {
        method: "POST",
        body: JSON.stringify(reqBody),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => response.json()).then((data) => {
        console.log("<- LOG -> file: index.tsx -> line 30 -> HomePage -> data", data)

      })

    }
  }

  return (
    <div className={styles.container}>

      <form action="" onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">your email address</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="">your feedback</label>
          <textarea name="" id="feedback" rows={5} ref={feedbackInputRef}>
          </textarea>
        </div>
        <button>Send feedback</button>
      </form>
      <div>
        <Link href='/feedback' >
          <button>get feedback</button>
        </Link>
      </div>
    </div>
  )
}
