#Breeturner.com.au

###Wordpress theme by Mark Stuart.


##Installation.

git clone into the themes directory in the Wordpress directory.

A few things need to be set up for the site to work properly.

###Contact form

Three plugins need to be installed in order for this to work.

*	Contact Form 7
*	GMail SMTP
*	Really Simple CAPTCHA

####Contact Form 7

Create a new form, it can be named anything. After the form is created a shortcode will be created automatically and needs to be inserted into the index.php file in order for the site to load the form.
Delete the basic form that has been provided and copy and paste the following html into the block.

~~~
<div id="contact">
   <div id="contact-left">
      <p>Your Name (required)</p>
      <div>[text* your-name]</div>
      <p>Your Email (required)</p>
      <div>[email* your-email]</div>
      <p>Subject</p>
      <div>[text your-subject]</div>
      <p>Just a wee test to make sure you're not a robot</p>
      <div id="recapcha">
         <p>Please enter this code <span>[captchac captcha-1]</span><span>[captchar captcha-1 6/10]</span></p>
      </div>
      <div id="submit-wide">[submit "Send"]</div>
   </div>
   <div id="contact-right">
      <p>Your Message</p>
      <div>[textarea your-message]</div>
   </div>
   <div id="submit-thin">[submit "Send"]</div>
</div>
~~~

Finally under the "Mail" tab set the "to" field to the target email that messages sent through this form should be sent to.

####Really Simple CAPTCHA

This plugin allows for a simple bot checking field to be inserted into the above form.
To use this a site key and secret key is needed from google reCAPTHA. Under the Contact tab in the Wordpress dashboard there is an "Integration" sub tab that has a link to google reCAPTCHA and the keys can be obtained there once an account is set up.
This will give you the site and secret keys that can be copied and pasted into the "integration" screen.

Once this has been done and the reCAPTCHA shortcode is inserted into the form (it already is in the above html form) then reCAPTCHA should work.

####GMail SMTP

This needs to be set up in order for the site to send mail and not get lost in peoples spam folder. It uses a designated gmail account to send email from the site.
Install and navigate to the "Gmail SMTP" sub tab under the "Settings" tab in the wordpress dashboard.

This is a good site describing the process:
http://www.wpbeginner.com/plugins/how-to-send-email-in-wordpress-using-the-gmail-smtp-server/

###Theme setup

####Menus

Two menus need to be set up in the customise sub tab under the Appearance tab in the Wordpress dashboard.

The first needs to be named "menu"
The second "No-JS" and is used if you need to separate out elements that are usually displayed using javascript into its own page. Such as the contact form element on the home page.

####Home page.

Under "Appearance" > "Customize" > "static front page" set "Front Page" to Home (or whatever the landing page is called).
Set the header image under "Appearance" > "Customize" > "Header Image". This is the main image on the landing page.

####Blog Page

To get the post listing page to work the "Template" field needs to be set to "blog-page".
