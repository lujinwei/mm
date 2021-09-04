<template>
    <div class="login-box">
        <div class="bg"><img src="../../assets/img/login-top.png" /></div>
        <div class="form">
            <ul>
                <li class="item">
                    <input
                        class="phone"
                        v-model="phone"
                        type="text"
                        placeholder="输入手机号码"
                    />
                </li>
                <li class="item">
                    <input
                        class="pwd"
                        v-model="pwd"
                        type="password"
                        placeholder="请输入密码"
                    />
                </li>
                <li class="item">
                    <input
                        class="code"
                        v-model="code"
                        type="text"
                        placeholder="输入验证码"
                    />
                    <span class="getcode" @click="getCode">发送验证码</span>
                </li>
                <li class="item">
                    <button @click="submit">登录</button>
                </li>
            </ul>
            <!-- <p>游客登录</p> -->
        </div>
        <div class="login-footer">
            <!-- <div class="other">
                其他登录方式
            </div> -->
        </div>
    </div>
</template>
<script>
import { getCaptcha, getCaptchaVerify,login } from "../../api/base";
import { Toast } from "vant";
export default {
    data() {
        return {
            phone: null,
            code: null,
            pwd:null,
        };
    },
    methods: {
        getCode() {
            // 1、手机号码验证
            let reg =
                /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
            if (!reg.test(this.phone)||this.phone==null) {
                console.log(this.phone);
                Toast("请输入正确手机号");
                return;
            }
            // 手机号正确获取验证码
            this.getCaptchaFun();
        },
        // 获取手机验证码
        getCaptchaFun() {
            getCaptcha({ phone: parseInt(this.phone) }).then((data) => {
                if (data.code == 200) {
                    Toast("验证码发送成功");
                }
            });
        },
        // 手机验证码验证
        submit() {
            let reg = /^\d{4}$/;

            if (!this.phone==null) {
                Toast("请输入正确手机号");
                return;
            }
            if (!reg.test(this.code)) {
                Toast("请输入正确验证码");
                return;
            }
            getCaptchaVerify({
                phone: this.phone,
                captcha: this.code 
            }).then((data) => {
                    this.loginFun();
                    window.localStorage.setItem("login","true");
                    console.log(data);
                // if(data.code==200){
                //     // Toast("登录成功");
                //     window.localStorage.setItem("login","true");
                //     // 个人登录中心判断是否登录
                //     this.loginFun();
                //     // this.$router.push("/userIndex")
                // }else{
                //     Toast("登录失败！");
                // }
            });
        },
        loginFun(){
            // phone=xxx&password=yyy
            login({phone:1,password:'e'}).then(data=>{
                console.log(data);
                window.localStorage.setItem("userId",3958329393);
                window.localStorage.setItem("cookie",data.cookie);
                window.localStorage.setItem("token",data.token);
                // window.localStorage.setItem("userId",data.account.id);
                // 3958329393
                console.log(data.account.id);
                this.$router.push("/")
            })
        }
    },
};
</script>
<style lang="less">
.login-box {
    width: 100%;
    height: 100%;
    position: relative;
    .bg {
        // position: absolute;
        width: 100%;
        img {
            width: 100%;
        }
    }
    .form {
        width: 260px;
        margin: 0px auto;
        margin-top: 50px;
        .item {
            width: 100%;
            border: 1px solid #ccc8;
            box-shadow: 0px 2px 11px -2px #dcdee0;
            height: 36px;
            border-radius: 18px;
            margin-top: 20px;
            overflow: hidden;
            position: relative;
            input {
                height: 36px;
                margin: 0;
                padding: 0;
                border: none;
                box-shadow: none;
                text-indent: 10px;
                &::-webkit-input-placeholder {
                    color: #aab2bd; /* placeholder颜色  */
                    font-size: 12px; /* placeholder字体大小  */
                }
            }
            .getcode {
                position: absolute;
                display: block;
                top: 0;
                right: 10px;
                font-size: 12px;
                line-height: 36px;
                color: skyblue;
            }
            button {
                outline: none;
                background: transparent;
                border: none;
                box-shadow: none;
                color: #fff;
                background: #ffa185;
                width: 100%;
                height: 36px;
                margin: 0;
                padding: 0;
            }
        }
        .item:last-child{
            border: none;
        }
        p{
            margin: 0;
            padding: 0;
            text-align: center;
            font-size: 14px;
            color: #ccc;
        }
    }
    .login-footer {
        margin-top: 50px;
        width: 100%;
        text-align: center;
        height: 100px;
    }
}
</style>