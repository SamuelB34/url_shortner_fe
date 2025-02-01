'use client'
import styles from './page.module.scss'
import { useEffect, useState } from 'react'
import { WebModal } from 'src/shared/components/web-modal/WebModal'
import Image from 'next/image'
import { createUrlShort } from 'src/shared/services/urlService'
import { WebToast } from 'src/shared/components/web-toast/WebToast'

export default function Home() {
	const [modalOpen, setModalOpen] = useState(false)
	const [copied, setCopied] = useState(false)
	const [value, setValue] = useState('')
	const [shortUrl, setShortUrl] = useState('')

	const [error, setError] = useState(false)
	const [errorMsg, setErrorMsg] = useState('')

	const addUrl = async () => {
		try {
			const res = await createUrlShort(value)
			setShortUrl(res.data.short_id)
			setModalOpen(true)
			setValue('')
		} catch (e: any) {
			setErrorMsg(e.response.data.error || 'Server Error')
			setError(true)
		}
	}

	return (
		<div className={styles.page}>
			<div className={styles.form}>
				<input
					className={styles.input}
					type="text"
					placeholder="Enter URL"
					value={value}
					onChange={(e) => setValue(e.target.value)}
				/>
				<button
					className={styles.button}
					onClick={() => {
						addUrl()
					}}
				>
					Short the link
				</button>
			</div>

			{error && (
				<WebToast type={'error'} msg={errorMsg} close={() => setError(false)} />
			)}

			{modalOpen && (
				<WebModal
					title={'URL Shortening Service'}
					close={() => {
						setModalOpen(false)
						setCopied(false)
					}}
				>
					<>
						<div className={styles.modal}>
							<span>{shortUrl}</span>
							<div
								onClick={async () => {
									await navigator.clipboard.writeText(shortUrl)
									setCopied(true)
								}}
							>
								{copied ? (
									<Image
										src={'/check.svg'}
										alt={'copy'}
										height="20"
										width="20"
									/>
								) : (
									<Image
										src={'/copy.svg'}
										alt={'copy'}
										height="20"
										width="20"
									/>
								)}
							</div>
						</div>
					</>
				</WebModal>
			)}
		</div>
	)
}
