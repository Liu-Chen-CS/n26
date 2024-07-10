import "./index.scss";
import Stats from "../../components/Stats/Stats";
import {useState} from "react";
import {useFormik} from "formik";
import {object, string} from 'yup';

type FormType = {
    username?: string,
    password?: string,
}

type ErrorType = {
    username?: string | null,
    password?: string | null,
}

const initialValues: FormType = {
    username: "Liu Chen",
    password: "",
}

const Month = () => {
    const formik = useFormik({
        initialValues,
        onSubmit: values => {
            console.log(values)},
        validationSchema: object({
            username: string().max(15, "Yup - 用户长度不能大于15").required("Yup - 请输入用户名"),
            password: string().min(6, "Yup - 密码的长度不能小于6").required("Yup - 请输入密码"),
        }),
        // validate: (values: FormType):ErrorType => {
        //     const errors: ErrorType = {};
        //     if (!values.username) {
        //         errors.username = "请输入用户名";
        //     } else if (values.username.length > 15) {
        //         errors.username = "用户名长度不能大于15";
        //     }
        //     if (!values.password) {
        //         errors.password = "请输入密码";
        //     } else if (values.password.length < 6) {
        //         errors.password = "密码的长度不能小于6";
        //     } else if (values.password.length > 15) {
        //         errors.password = "密码的长度不能大于15";
        //     }
        //     return errors;
        // },
    });
    return (
        <div className="monthlyBill">
            {/*Stats components*/}
            <Stats name={"month"}></Stats>
            {/*DailyBill*/}
            <div className="content">
                <div className="left">1</div>
                <div className="middle">
                    <form>
                        <fieldset>
                            <legend>Main Info</legend>
                            <label>
                                id: <input type="text" name="name"/>
                            </label><br/>
                            <label>
                                password:
                                <input
                                    type="password"
                                    name="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <span>
                                    {
                                        formik.touched.password && formik.errors.password ? formik.errors.password : null
                                    }
                                </span>
                            </label><br/>
                        </fieldset>
                        <fieldset>
                            <legend>Sub Info</legend>
                            gender:
                            <label>
                                <input type="radio" name="gender" value="male"/>Male
                            </label>
                            <label>
                                <input type="radio" name="gender" value="female"/>Female
                            </label><br/>
                            Hobby:
                            <label>
                                <input type="checkbox" name="hobby" value="apple"/>Apple
                            </label>
                            <label>
                                <input type="checkbox" name="hobby" value="Samsung"/>Samsung
                            </label>
                            <label>
                                <input type="checkbox" name="hobby" value="Huawei"/>Huawei
                            </label><br/>
                            City:
                            <select name="select">
                                <option value="01">重庆</option>
                                <option value="02">成都</option>
                                <option value="03">上海</option>
                            </select>
                        </fieldset>
                        Additional info:
                        <textarea name="textarea" cols={10} rows={10}></textarea><br/>
                        <input type="reset" value="reset"/>
                        <input type="submit" value="submit"/>
                    </form>
                </div>
                <div className="right">
                    <form onSubmit={formik.handleSubmit}>
                        <label>
                            User Name:
                            <input
                                type="text"
                                name="username"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </label>
                        <p>
                            {
                                formik.touched.username && formik.errors.username ? formik.errors.username : null
                            }
                        </p>
                        <br/>
                        <label>
                            Password:
                            <input
                                type="password"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </label>
                        <p>
                            {
                                formik.touched.password && formik.errors.password ? formik.errors.password : null
                            }
                        </p>
                        <input type="submit"/>
                    </form>
                    <div>{formik.values.username}</div>
                </div>
            </div>
        </div>
    );
}
export default Month;
