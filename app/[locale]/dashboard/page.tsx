"use client"
import { UserTrips } from "@/components/UserTrips"
import { CruiseoContext } from "@/context/context"
import { useRouter } from "next/navigation"
import React, { useContext, useEffect, useState } from "react"
export default function Dashboard() {
  const [status, setStatus] = useState(null)
  const [customerEmail, setCustomerEmail] = useState("")
  const router = useRouter()
  const { selectedTrip, setSelectedTrip } = useContext(CruiseoContext)

  const sendEmail = async () => {
    const res = await fetch(`api/email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "message",
        email: "",
        subject:"Thanks"
      })
    })
  }
  useEffect(() => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const sessionId = urlParams.get("session_id")

    fetch(`/api/checkout_sessions?session_id=${sessionId}`, {
      method: "GET"
    })
      .then(res => res.json())
      .then(data => {
        setStatus(data.status)
        setCustomerEmail(data.customer_email)
      })
  }, [])

  if (status === "open") {
    return router.push("/")
  }

  if (status === "complete") {
    //sendEmail()
    return (
      <div className="w-full flex flex-col">
        <section id="success">
          <p>
            We appreciate your business! A confirmation email will be sent to{" "}
            {customerEmail}. If you have any questions, please email{" "}
            <a href="mailto:orders@example.com">orders@example.com</a>.
          </p>
        </section>
        <UserTrips />
      </div>
    )
  }

  return null
}
