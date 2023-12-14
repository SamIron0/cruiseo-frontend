export default async function ContactUs() {
    return (
        <div className=" text-black p-8 ">
            <h1 className=" text-black font-medium text-4xl mb-12 mt-16">
                Contact
            </h1>

            <h2 className="mb-4 font-medium  ">
                Customer Support
            </h2>
            <p className="max-w-2xl mb-8">You can reach us at the phone number or email below and we'll be more than happy to answer any questions you may have.
            </p>
            <div className="w-full shrink-0 grow-0 basis-auto lg:w-7/12">
                <div className="flex flex-wrap">
                    <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:px-6">
                        <div className="flex items-start">
                            <div className=" shrink-0">
                                <div className="inline-block p-5 rounded-md bg-fuchsia-300  text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                        stroke="currentColor" className="h-10 w-10">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="ml-3 mt-2 grow">
                                <p className="text-neutral-500 dark:text-neutral-200">
                                    support@example.com
                                </p>
                                <p className="text-neutral-500 dark:text-neutral-200">
                                    +1 360 804 7005
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
                <p>
                </p>
            </div>
        </div>
    )
}