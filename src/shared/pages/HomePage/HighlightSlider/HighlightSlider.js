import React from 'react'
import { Link } from 'react-router'
import styles from './HighlightSlider.scss'

function HighlightSlider() {
  return (
    <section className={styles.container}>
      <div className={styles.item}>
        <img className={styles.image} src="" alt="" />
        <div className={styles.detail}>
          <Link to="@mypum/posts/123">
            <h2 className={styles.title}>6 เคล็ดลับพิชิตความหนาวในเนปาล</h2>
            <p className={styles.desc}>การเดินเทรคที่เนปาลนั้น นอกจากจะต้องเดินทรหดนานนับหลายชั่วโมงแล้ว เรายังต้องต่อสู้กับความหนาว</p>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HighlightSlider
