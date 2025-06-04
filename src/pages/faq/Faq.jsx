import { faqs } from './faqs'
import s from './Faq.module.scss'
export function Faq() {
	return (
		<section className={s.faq}>
			<h1 className={s.faq_title}>FAQ for TrailerNest</h1>
			<ul className={s.faq_list}>
				{faqs.map(({ question, answer, id }, idx) => (
					<li key={idx} className={s.faq_list_item} id={id}>
						<h3 className={s.faq_list_item_question}>{question}</h3>
						<p className={s.faq_list_item_answer}>{answer}</p>
					</li>
				))}
			</ul>
		</section>
	)
}
