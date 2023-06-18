import React from 'react'
import s from './NotFound.module.css'
import { Link } from 'react-router-dom'
export const NotFound = () => {
  return (
   <section className={s.page_404}>
    <div className={s.container}>
        <div className={s.row}>
            <div>
                <div className={s.animationDiv}>
                    <div className={s.four_zero_four_bg}>
                        <h1>404</h1>
                    </div>
                    <div className={s.contant_box_404}>
                        <h3 className={s.h2}>
                            Looks like you're lost
                        </h3>
                        <p>the page you are looking for not available!</p>
                        <Link className={s.link_404} to='/'>Go to Login Page</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
  )
}
