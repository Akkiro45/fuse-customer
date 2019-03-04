import React from 'react';

import module from './UserPrivacyPolicy.module.css';

const userPrivacyPolicy = (props) => {
    const PrivacyPolicy = (
        <div className={module.mainDiv}>
            <h2>Privacy Policy</h2>
            <div className={module.mainContent}>
                <span>
                    Welcome to Fuse!<br />
                    <p>This website is owned and managed by Fuse. Fuse respects your privacy. The Privacy Policy set out below details the manner in which information relating to you is collected, used and disclosed. </p>
                    <p>Customers are advised to please read the Privacy Policy carefully. By accessing and using the &quot;https://shop.thefuse.in&quot; website, (the “Web Site”), you are agreeing to be legally bound by the terms &amp; conditions of the privacy policy and consent to the collection and use of your data by the Fuse in the manner provided in the Privacy Policy. If you do not agree with the terms &amp; conditions of the Privacy Policy, please do not use or access the website.</p>
                    <p>Fuse may change these terms &amp; conditions of Privacy Policy at any time without any prior notification to you. You can access the latest version of these terms &amp; conditions of Privacy Policy at any given time on the Site. Your use of the Web Site after any changes have been posted will constitute your agreement to the modified terms &amp; conditions of Privacy Policy and all of the changes. Therefore, you should read the Privacy Policy from time to time for changes.</p>
                </span>
                <div className={module.subcontent}>
                    <h4>Information is, or may be, collected from you</h4>
                    <span>During the registration process on the Site, Fuse will collect the following information about you: Name including first and last name, phone number, email address, shop information such as Shop Name, address, and other shop related information. Fuse also collects information about the pages on the site you visit/access, the links you click on the site, the number of times you access the page and any such browsing information.</span>
                </div>
                <div className={module.subcontent}>
                    <h4>How do we collect the Information?</h4>
                    <span>Fuse will collect personal information about you only as part of registration process. As you browse through the website you may access links to other web sites. Fuse is not responsible for the privacy policy of such Web sites which it does not own, manage or control. The Site and third-party vendors, including Google, use first-party cookies (such as the Google Analytics cookie) and third-party cookies (such as the Double Click cookie) together to inform, optimize, and serve ads based on someone's past visits to the Site.</span>
                </div>
                <div className={module.subcontent}>
                    <h4>How is information used?</h4>
                    <span>Fuse will use your personal information to provide personalized features to you on the Site. Fuse will provide this information to all the users who will access your shop.</span>
                </div>
                <div className={module.subcontent}>
                    <h4>With whom your information will be shared?</h4>
                    <span>Fuse does not rent, sell or share your personal information and will not disclose any of your personally identifiable information to third parties. Your information will be provided to all the users who will access your shop. Fuse may use this information to help investigate, prevent or take action regarding unlawful and illegal activities, suspected fraud and potential threat to the safety or security of any person.</span>
                </div>
                <div className={module.subcontent}>
                    <h4>Choices available regarding collection, use and distribution of information</h4>
                    <span>To protect against the loss, misuse and alteration of the information under its control, Fuse has in place appropriate physical, electronic and managerial procedures. For example, Fuse servers are accessible only to authorized personnel and your information is shared to all the users who will access your shop. By using this site, you agree that Fuse will have no liability for disclosure of your information due to errors in transmission or unauthorized acts of third parties.</span>
                </div>
                <div className={module.subcontent}>
                    <h4>Contact Information</h4>
                    <span>
                        <p>In the event of loss of access to the website, you contact the Company by sending an e-mail to: contact@thefuse.in.</p>
                        <p>Email id: contact@thefuse.in</p>
                    </span>
                </div>
            </div>
        </div>
    );
    return PrivacyPolicy;
}

export default userPrivacyPolicy;