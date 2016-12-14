/*
// index
// --------------------------------------------------
*/

import React, { Component } from 'react'

import { Link } from 'react-router'

import { Header,Footer,Article } from 'components'

export default class Activity extends Component {

    componentDidMount() {
      //
      //专题-添加动画类名
      //
        if ($(window).height() < 1023)
        {
          $('.spec_mb_bannerT').addClass('appear');
          $(window).scroll(function()
          {
            var wH = $(window).scrollTop() + 450;
            var p1 = $('.mb-p1').offset().top;
            var p2 = $('.mb-p2').offset().top;
            var p3 = $('.mb-p3').offset().top;
            var p4 = $('.mb-p4').offset().top;
            var p5 = $('.mb-p5').offset().top;
            var p6 = $('.mb-p6').offset().top;
           
            if (wH > p6)
            {
               $('.mb-p6>img').addClass('appear');
             
            }
              else if (wH + 50 > p5)
            {
              $('.mb-p5>img').addClass('appear2');
            }
            else if (wH > p4)
            {
              $('.mb-p4>img').addClass('appear3');
            }
            else if (wH > p3)
            {
              $('.mb-p3>img').addClass('appear2');
            }
            else if (wH > p2)
            {
              $('.mb-p2>img').addClass('appear3');
            }
            else if (wH > p1)
            {
              $('.mb-p1>img').addClass('appear2');
            }
            else
            {}
			});
        }
        else
        {
          $('.spec_mb_bannerT').removeClass('appear');
        }
    }

    render() {

        const articleTitle = <img src={ require('img/frontpay.jpg') } alt=""/>

        let mobileTitle = (
            <div className="PB-nav-wrap ">
                <div className="PB-nav-m mobile-index">
                    <div>
                        <a href="javascript:history.go(-1);" className="head-btn"> <i
                            className="icon-chevron-thin-left"></i>
                        </a>
                        <p>
                        </p>
                    </div>
                </div>
            </div>
        )

        return (
            <div className="container-inner container-activity">
                    {mobileTitle}
                    <div className="PB-pub-banner spec">
                        <div></div>
                    </div>
                    <div className="spec-bg">
                        <div className="spec-box">
                            <p className="spec-box-txt">噔噔噔噔！万众瞩目的E+供应链云平台重磅上线啦，马上来注册成为平台代言人（即推荐人），帮助企业轻松融资的同时还可以获得奖励哦，您还在等什么？机不可失，赶紧来围观！</p>
                            <img src={require('img/spec_con1.png')} />
                            <img src={require('img/spec_con2.png')} />
                            <div className="spec-box-act fn-pt-30">
                                <img src={require('img/spec_con3.png')} />
                                <Link to="/application">
                                    <img src={require('img/spec_btn.png')} />
                                </Link>
                            </div>
                        </div>
                        <div className="spec-mb-box">
                            <div className="spec-mb-banner">
                                <img src={require('img/spec_mb1.png')} />
                                <div className="spec_mb_bannerT">
                                    <img src={require('img/spec_mb_bannerT.png')} />
                                </div>
                            </div>
                            <div className="spec-mb-con1">
                                {[...Array(6).keys()].map((it, i) => {
                                    return (
                                        <div key={i} className={'spec-mb-con1-c ' + 'mb-p' + (i + 1)}>
                                            <img src={ require('img/spec-mb-con' + (i + 1) + '.png')} />
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="spec-mb-con2">
                                <img src={require('img/spec_mb_con1.png')} />
                                <div className="spec-box-mbact">
                                    <img src={require('img/spec_mb_con2.png')} />
                                    <Link to="/application">
                                        <img src={require('img/spec_mb_btn.png')} />
                                    </Link>
                                </div>

                                <img src={require('img/spec_mb_con3.png')} />
                            </div>
                        </div>
                    </div>
                {/* 页脚 */}
                <Footer/>
            </div>
        )
    }
}
