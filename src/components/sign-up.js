import './sign-up.css';
import logoImage from '../utils/logo-e-com.png';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { enableBodyScroll } from 'body-scroll-lock';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phNumber, setPhNumber] = useState('');
    const [upUserName, setUpUserName] = useState('');
    const [upPassword, setUpPassword] = useState('');
    const [conPassword, setConPassword] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [street2, setStreet2] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [signUp, setSignUp] = useState(false);
    const [isEmpty, setIsEmpty] = useState(true);
    const [comparePassword, setComparePassword] = useState(true);
    const navigate = useNavigate();
    const [showPass, setShowPass] = useState(false);
    const [showConPass, setShowConPass] = useState(false);
    const [signUpData, setSignUpData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/users")
            .then(response => setSignUpData(response.data))
    }, [])

    useEffect(() => {
        enableBodyScroll(document);
    }, [])

    const signUpEmptyHandler = () => {
        setSignUp(true);
        if(firstName !== '' &&
            lastName !== '' &&
            email !== '' &&
            phNumber !== '' &&
            upUserName !== '' &&
            upPassword !== '' &&
            streetAddress !== '' &&
            city !== '' &&
            zipCode !== '' &&
            state !== '' &&
            country !== ''){
                setIsEmpty(false)
            }
    }

    const signUpHandler = (e) => {
        const index = signUpData.findIndex(data => data.email === email || data.phoneNumber === phNumber)
        e.preventDefault();
        !isEmpty && comparePassword && index === -1 && axios.post("http://localhost:3000/users", {
            "firstname": firstName,
            "lastname": lastName,
            "email": email,
            "phoneNumber": phNumber,
            "username": upUserName,
            "password": upPassword,
            "street-address": streetAddress,
            "street-address-2": street2,
            "city": city,
            "zipcode": zipCode,
            "state": state,
            "country": country,
            },
            {headers: {
                'Content-Type': 'application/json',
                }
            })


        if(!isEmpty && comparePassword && index === -1){
            alert("Account has been added, please sign in to continue")
        }else if(!isEmpty && comparePassword && index !== -1){
            alert("user already exists, please use different email and phone number")
        }
        !isEmpty && comparePassword && index === -1 && navigate("/Sign-in")  
    }
           
            useEffect(() => {
                if(upPassword !== conPassword){
                    setComparePassword(false)
                }else{
                    setComparePassword(true)
                }
            }, [upPassword, conPassword])
            
    return(
        <div className='signUp-page'>
            <img src={logoImage} alt='logo' className='logo'/>
            <div className='signUpForm-holder'>
                <form className='signUp-form' onSubmit={(e) => signUpHandler(e)}>
                    <span>Sign up</span>
                    <label className='nameLabel' for="name">Enter your Name:</label><br/>
                    <div id='name'>
                        <input id="first" type='text' placeholder='First Name' onChange={(e) => {setFirstName(e.target.value)}} style={signUp && firstName==='' ? {border: "1px solid red", boxShadow: "0px 0px 5px red"} : {}}/>
                        <input id="last" type='text' placeholder='Last Name' onChange={(e) => {setLastName(e.target.value)}} style={signUp && lastName==='' ? {border: "1px solid red", boxShadow: "0px 0px 5px red"} : {}}/>
                        {signUp && firstName==='' && <p>!!!Please Enter First Name</p>}
                        {signUp && lastName==='' && <p style={firstName!=='' ? {marginLeft: "200px"} : {}}>!!!Please Enter Last Name</p>}
                    </div>
                    <label for='email' className='emailLabel'>Enter your e-mail:</label>
                    <input type='email' id='email' placeholder='ex: myname@example.com' onChange={(e) => {setEmail(e.target.value)}} style={signUp && email==='' ? {border: "1px solid red", boxShadow: "0px 0px 5px red"} : {}}/>
                    {signUp && email==='' && <p className='emailErr'>!!!Please Enter e-mail</p>}
                    <label for='phNumber' className='phNumberLabel'>Enter your Phone Number:</label>
                    <input type='tel' id='phNumber' placeholder='+91-1234567890' onChange={(e) => {setPhNumber(e.target.value)}} style={signUp && phNumber==='' ? {border: "1px solid red", boxShadow: "0px 0px 5px red"} : {}}/>
                    {signUp && phNumber==='' && <p className='phNumberErr'>!!!Please Enter Phone Number</p>}
                    <label for='upUserName' className='upUserNameLabel'>Enter your UserName:</label>
                    <input id='upUserName' type='text' onChange={(e) => {setUpUserName(e.target.value)}} style={signUp && upUserName==='' ? {border: "1px solid red", boxShadow: "0px 0px 5px red"} : {}}/>
                    {signUp && upUserName==='' && <p className='upUserErr'>!!!Please Enter UserName</p>}
                    <label for='upPassword' className='upPasswordLabel'>Enter Password:</label>
                    {showPass && <FontAwesomeIcon className="upEyeIcon" icon={faEye} onClick={() => {setShowPass(false)}}/>}
                    {!showPass && <FontAwesomeIcon className="upEyeIcon" icon={faEyeSlash} onClick={() => {setShowPass(true)}}/>}
                    <input id='upPassword' type={showPass ? 'text' : 'password'} onChange={(e) => {setUpPassword(e.target.value)}} style={signUp && (upPassword==='' || !comparePassword) ? {border: "1px solid red", boxShadow: "0px 0px 5px red"} : {}}/>
                    {signUp && upPassword==='' && <p className='upPassErr'>!!!Please Enter Password</p>}
                    <label for='confirmPassword' className='confirmPasswordLabel'>Confirm Password:</label>
                    {showConPass && <FontAwesomeIcon className="upConEyeIcon" icon={faEye} onClick={() => {setShowConPass(false)}}/>}
                    {!showConPass && <FontAwesomeIcon className="upConEyeIcon" icon={faEyeSlash} onClick={() => {setShowConPass(true)}}/>}
                    <input type={showConPass ? 'text' : 'password'} id='confirmPassword' onChange={(e) => {setConPassword(e.target.value)}} style={signUp && (conPassword==='' || !comparePassword) ? {border: "1px solid red", boxShadow: "0px 0px 5px red"} : {}}/>
                    {signUp && conPassword==='' && <p className='confirmPassErr'>!!!Please Confirm Password</p>}
                    {!comparePassword && signUp && upPassword !== '' && conPassword !== '' && <p className='confirmPassErr'>!!!Passwords don't Match</p>}
                    <label for='address' className='addressLabel'>Address:</label>
                    <div id='address'>
                        <input type='text' className='streetAddress' placeholder='Street Address' onChange={(e) => {setStreetAddress(e.target.value)}}  style={signUp && streetAddress==='' ? {border: "1px solid red", boxShadow: "0px 0px 5px red"} : {}}/>
                        {signUp && streetAddress==='' && <p className='streetErr'>!!!Please Enter Street Address</p>}
                        <input type='text' className='streetAddress2' placeholder='Street Address Line 2' onChange={(e) => {setStreet2(e.target.value)}}/>
                        <div className='miscelAddress'>
                            <input type='text' className='city' placeholder='City' onChange={(e) => {setCity(e.target.value)}} style={signUp && city==='' ? {border: "1px solid red", boxShadow: "0px 0px 5px red"} : {}}/>
                            <input type='text' className='zipCode' placeholder='Zip Code' onChange={(e) => {setZipCode(e.target.value)}} style={signUp && zipCode==='' ? {border: "1px solid red", boxShadow: "0px 0px 5px red"} : {}}/>
                            {signUp && city==='' && <p className='cityErr'>!!!Please Enter City</p>}
                            {signUp && zipCode==='' && <p className='zipErr' style={city!=='' ? {marginLeft: "205px"} : {}}>!!!Please Enter Zip Code</p>}
                            <input type='text' className='state' placeholder='State' onChange={(e) => {setState(e.target.value)}} style={signUp && state==='' ? {border: "1px solid red", boxShadow: "0px 0px 5px red"} : {}}/>
                            <select name='country' id='country'onChange={(e) => {setCountry(e.target.value)}} style={signUp && country==='' ? {border: "1px solid red", boxShadow: "0px 0px 5px red"} : {}}>
                                <option value="none" selected disabled hidden>select Country</option>
                                <option value="Afghanistan">Afghanistan</option>
                                <option value="Albania">Albania</option>
                                <option value="Algeria">Algeria</option>
                                <option value="American Samoa">American Samoa</option>
                                <option value="Andorra">Andorra</option>
                                <option value="Angola">Angola</option>
                                <option value="Anguilla">Anguilla</option>
                                <option value="Antartica">Antarctica</option>
                                <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                                <option value="Argentina">Argentina</option>
                                <option value="Armenia">Armenia</option>
                                <option value="Aruba">Aruba</option>
                                <option value="Australia">Australia</option>
                                <option value="Austria">Austria</option>
                                <option value="Azerbaijan">Azerbaijan</option>
                                <option value="Bahamas">Bahamas</option>
                                <option value="Bahrain">Bahrain</option>
                                <option value="Bangladesh">Bangladesh</option>
                                <option value="Barbados">Barbados</option>
                                <option value="Belarus">Belarus</option>
                                <option value="Belgium">Belgium</option>
                                <option value="Belize">Belize</option>
                                <option value="Benin">Benin</option>
                                <option value="Bermuda">Bermuda</option>
                                <option value="Bhutan">Bhutan</option>
                                <option value="Bolivia">Bolivia</option>
                                <option value="Bosnia and Herzegowina">Bosnia and Herzegowina</option>
                                <option value="Botswana">Botswana</option>
                                <option value="Bouvet Island">Bouvet Island</option>
                                <option value="Brazil">Brazil</option>
                                <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                                <option value="Brunei Darussalam">Brunei Darussalam</option>
                                <option value="Bulgaria">Bulgaria</option>
                                <option value="Burkina Faso">Burkina Faso</option>
                                <option value="Burundi">Burundi</option>
                                <option value="Cambodia">Cambodia</option>
                                <option value="Cameroon">Cameroon</option>
                                <option value="Canada">Canada</option>
                                <option value="Cape Verde">Cape Verde</option>
                                <option value="Cayman Islands">Cayman Islands</option>
                                <option value="Central African Republic">Central African Republic</option>
                                <option value="Chad">Chad</option>
                                <option value="Chile">Chile</option>
                                <option value="China">China</option>
                                <option value="Christmas Island">Christmas Island</option>
                                <option value="Cocos Islands">Cocos (Keeling) Islands</option>
                                <option value="Colombia">Colombia</option>
                                <option value="Comoros">Comoros</option>
                                <option value="Congo">Congo</option>
                                <option value="Congo">Congo, the Democratic Republic of the</option>
                                <option value="Cook Islands">Cook Islands</option>
                                <option value="Costa Rica">Costa Rica</option>
                                <option value="Cota D'Ivoire">Cote d'Ivoire</option>
                                <option value="Croatia">Croatia (Hrvatska)</option>
                                <option value="Cuba">Cuba</option>
                                <option value="Cyprus">Cyprus</option>
                                <option value="Czech Republic">Czech Republic</option>
                                <option value="Denmark">Denmark</option>
                                <option value="Djibouti">Djibouti</option>
                                <option value="Dominica">Dominica</option>
                                <option value="Dominican Republic">Dominican Republic</option>
                                <option value="East Timor">East Timor</option>
                                <option value="Ecuador">Ecuador</option>
                                <option value="Egypt">Egypt</option>
                                <option value="El Salvador">El Salvador</option>
                                <option value="Equatorial Guinea">Equatorial Guinea</option>
                                <option value="Eritrea">Eritrea</option>
                                <option value="Estonia">Estonia</option>
                                <option value="Ethiopia">Ethiopia</option>
                                <option value="Falkland Islands">Falkland Islands (Malvinas)</option>
                                <option value="Faroe Islands">Faroe Islands</option>
                                <option value="Fiji">Fiji</option>
                                <option value="Finland">Finland</option>
                                <option value="France">France</option>
                                <option value="France Metropolitan">France, Metropolitan</option>
                                <option value="French Guiana">French Guiana</option>
                                <option value="French Polynesia">French Polynesia</option>
                                <option value="French Southern Territories">French Southern Territories</option>
                                <option value="Gabon">Gabon</option>
                                <option value="Gambia">Gambia</option>
                                <option value="Georgia">Georgia</option>
                                <option value="Germany">Germany</option>
                                <option value="Ghana">Ghana</option>
                                <option value="Gibraltar">Gibraltar</option>
                                <option value="Greece">Greece</option>
                                <option value="Greenland">Greenland</option>
                                <option value="Grenada">Grenada</option>
                                <option value="Guadeloupe">Guadeloupe</option>
                                <option value="Guam">Guam</option>
                                <option value="Guatemala">Guatemala</option>
                                <option value="Guinea">Guinea</option>
                                <option value="Guinea-Bissau">Guinea-Bissau</option>
                                <option value="Guyana">Guyana</option>
                                <option value="Haiti">Haiti</option>
                                <option value="Heard and McDonald Islands">Heard and Mc Donald Islands</option>
                                <option value="Holy See">Holy See (Vatican City State)</option>
                                <option value="Honduras">Honduras</option>
                                <option value="Hong Kong">Hong Kong</option>
                                <option value="Hungary">Hungary</option>
                                <option value="Iceland">Iceland</option>
                                <option value="India">India</option>
                                <option value="Indonesia">Indonesia</option>
                                <option value="Iran">Iran (Islamic Republic of)</option>
                                <option value="Iraq">Iraq</option>
                                <option value="Ireland">Ireland</option>
                                <option value="Israel">Israel</option>
                                <option value="Italy">Italy</option>
                                <option value="Jamaica">Jamaica</option>
                                <option value="Japan">Japan</option>
                                <option value="Jordan">Jordan</option>
                                <option value="Kazakhstan">Kazakhstan</option>
                                <option value="Kenya">Kenya</option>
                                <option value="Kiribati">Kiribati</option>
                                <option value="Democratic People's Republic of Korea">Korea, Democratic People's Republic of</option>
                                <option value="Korea">Korea, Republic of</option>
                                <option value="Kuwait">Kuwait</option>
                                <option value="Kyrgyzstan">Kyrgyzstan</option>
                                <option value="Lao">Lao People's Democratic Republic</option>
                                <option value="Latvia">Latvia</option>
                                <option value="Lebanon">Lebanon</option>
                                <option value="Lesotho">Lesotho</option>
                                <option value="Liberia">Liberia</option>
                                <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                                <option value="Liechtenstein">Liechtenstein</option>
                                <option value="Lithuania">Lithuania</option>
                                <option value="Luxembourg">Luxembourg</option>
                                <option value="Macau">Macau</option>
                                <option value="Macedonia">Macedonia, The Former Yugoslav Republic of</option>
                                <option value="Madagascar">Madagascar</option>
                                <option value="Malawi">Malawi</option>
                                <option value="Malaysia">Malaysia</option>
                                <option value="Maldives">Maldives</option>
                                <option value="Mali">Mali</option>
                                <option value="Malta">Malta</option>
                                <option value="Marshall Islands">Marshall Islands</option>
                                <option value="Martinique">Martinique</option>
                                <option value="Mauritania">Mauritania</option>
                                <option value="Mauritius">Mauritius</option>
                                <option value="Mayotte">Mayotte</option>
                                <option value="Mexico">Mexico</option>
                                <option value="Micronesia">Micronesia, Federated States of</option>
                                <option value="Moldova">Moldova, Republic of</option>
                                <option value="Monaco">Monaco</option>
                                <option value="Mongolia">Mongolia</option>
                                <option value="Montserrat">Montserrat</option>
                                <option value="Morocco">Morocco</option>
                                <option value="Mozambique">Mozambique</option>
                                <option value="Myanmar">Myanmar</option>
                                <option value="Namibia">Namibia</option>
                                <option value="Nauru">Nauru</option>
                                <option value="Nepal">Nepal</option>
                                <option value="Netherlands">Netherlands</option>
                                <option value="Netherlands Antilles">Netherlands Antilles</option>
                                <option value="New Caledonia">New Caledonia</option>
                                <option value="New Zealand">New Zealand</option>
                                <option value="Nicaragua">Nicaragua</option>
                                <option value="Niger">Niger</option>
                                <option value="Nigeria">Nigeria</option>
                                <option value="Niue">Niue</option>
                                <option value="Norfolk Island">Norfolk Island</option>
                                <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                                <option value="Norway">Norway</option>
                                <option value="Oman">Oman</option>
                                <option value="Pakistan">Pakistan</option>
                                <option value="Palau">Palau</option>
                                <option value="Panama">Panama</option>
                                <option value="Papua New Guinea">Papua New Guinea</option>
                                <option value="Paraguay">Paraguay</option>
                                <option value="Peru">Peru</option>
                                <option value="Philippines">Philippines</option>
                                <option value="Pitcairn">Pitcairn</option>
                                <option value="Poland">Poland</option>
                                <option value="Portugal">Portugal</option>
                                <option value="Puerto Rico">Puerto Rico</option>
                                <option value="Qatar">Qatar</option>
                                <option value="Reunion">Reunion</option>
                                <option value="Romania">Romania</option>
                                <option value="Russia">Russian Federation</option>
                                <option value="Rwanda">Rwanda</option>
                                <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option> 
                                <option value="Saint LUCIA">Saint LUCIA</option>
                                <option value="Saint Vincent">Saint Vincent and the Grenadines</option>
                                <option value="Samoa">Samoa</option>
                                <option value="San Marino">San Marino</option>
                                <option value="Sao Tome and Principe">Sao Tome and Principe</option> 
                                <option value="Saudi Arabia">Saudi Arabia</option>
                                <option value="Senegal">Senegal</option>
                                <option value="Seychelles">Seychelles</option>
                                <option value="Sierra">Sierra Leone</option>
                                <option value="Singapore">Singapore</option>
                                <option value="Slovakia">Slovakia (Slovak Republic)</option>
                                <option value="Slovenia">Slovenia</option>
                                <option value="Solomon Islands">Solomon Islands</option>
                                <option value="Somalia">Somalia</option>
                                <option value="South Africa">South Africa</option>
                                <option value="South Georgia">South Georgia and the South Sandwich Islands</option>
                                <option value="Span">Spain</option>
                                <option value="SriLanka">Sri Lanka</option>
                                <option value="St. Helena">St. Helena</option>
                                <option value="St. Pierre and Miguelon">St. Pierre and Miquelon</option>
                                <option value="Sudan">Sudan</option>
                                <option value="Suriname">Suriname</option>
                                <option value="Svalbard">Svalbard and Jan Mayen Islands</option>
                                <option value="Swaziland">Swaziland</option>
                                <option value="Sweden">Sweden</option>
                                <option value="Switzerland">Switzerland</option>
                                <option value="Syria">Syrian Arab Republic</option>
                                <option value="Taiwan">Taiwan, Province of China</option>
                                <option value="Tajikistan">Tajikistan</option>
                                <option value="Tanzania">Tanzania, United Republic of</option>
                                <option value="Thailand">Thailand</option>
                                <option value="Togo">Togo</option>
                                <option value="Tokelau">Tokelau</option>
                                <option value="Tonga">Tonga</option>
                                <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                                <option value="Tunisia">Tunisia</option>
                                <option value="Turkey">Turkey</option>
                                <option value="Turkmenistan">Turkmenistan</option>
                                <option value="Turks and Caicos">Turks and Caicos Islands</option>
                                <option value="Tuvalu">Tuvalu</option>
                                <option value="Uganda">Uganda</option>
                                <option value="Ukraine">Ukraine</option>
                                <option value="United Arab Emirates">United Arab Emirates</option>
                                <option value="United Kingdom">United Kingdom</option>
                                <option value="United States">United States</option>
                                <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                                <option value="Uruguay">Uruguay</option>
                                <option value="Uzbekistan">Uzbekistan</option>
                                <option value="Vanuatu">Vanuatu</option>
                                <option value="Venezuela">Venezuela</option>
                                <option value="Vietnam">Viet Nam</option>
                                <option value="Virgin Islands (British)">Virgin Islands (British)</option>
                                <option value="Virgin Islands (U.S)">Virgin Islands (U.S.)</option>
                                <option value="Wallis and Futana Islands">Wallis and Futuna Islands</option>
                                <option value="Western Sahara">Western Sahara</option>
                                <option value="Yemen">Yemen</option>
                                <option value="Serbia">Serbia</option>
                                <option value="Zambia">Zambia</option>
                                <option value="Zimbabwe">Zimbabwe</option>
                            </select>
                            {signUp && state==='' && <p className='stateErr'>!!!Please Enter State</p>}
                            {signUp && country==='' && <p className='countryErr' style={state!=='' ? {marginLeft: "205px"} : {}}>!!!Please Select Country</p>}
                        </div>
                    </div>
                    <button className='signUp' type='submit' onClick={() => signUpEmptyHandler()}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default SignUp;