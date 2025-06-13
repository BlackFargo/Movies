import s from './Support.module.scss'

export function Support() {
	return (
		<section className={s.privacy_policy}>
			<h2>Privacy Policy</h2>

			<p>
				This Privacy Policy explains how we collect, use, store, and protect
				your personal data when you provide your email address (“Personal
				Data”).
			</p>

			<h3>1. Data We Collect</h3>
			<ul>
				<li>
					<strong>Email Address:</strong> Collected when you register or
					subscribe.
				</li>
			</ul>

			<h3>2. Purpose of Processing</h3>
			<ul>
				<li>
					To send you account notifications, newsletters, and marketing
					materials.
				</li>
				<li>To verify your identity and prevent unauthorized access.</li>
			</ul>

			<h3>3. Legal Basis</h3>
			<p>
				We process your Personal Data based on your consent (you agree by
				checking the consent box) and to comply with applicable legal
				obligations.
			</p>

			<h3>4. Data Retention</h3>
			<p>
				We will retain your email address as long as your account is active or
				until you request deletion. After account deletion, we will securely
				erase your data within 30 days.
			</p>

			<h3>5. Data Security</h3>
			<p>
				We implement industry-standard measures (encryption in transit and at
				rest, access control) to protect your data against unauthorized access
				or breaches.
			</p>

			<h3>6. Your Rights</h3>
			<ul>
				<li>Access: You can request a copy of your Personal Data.</li>
				<li>Rectification: You can correct inaccurate or incomplete data.</li>
				<li>Erasure: You can request deletion of your Personal Data.</li>
			</ul>

			<h3>7. Contact Us</h3>
			<p>
				If you have any questions or wish to exercise your rights, please
				contact us at{' '}
				<a href='mailto:uriymulyar@gmail.com'>uriymulyar@gmail.com</a>.
			</p>
		</section>
	)
}
