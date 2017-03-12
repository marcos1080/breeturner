#Breeturner.com.au

###Wordpress theme by Mark Stuart.


##Installation.

git clone into the themes directory in the Wordpress directory.

A few things need to be set up for the site to work properly.

###Menus

Two menus need to be set up in the customise sub tab under the Appearance tab in the Wordpress dashboard.

The first needs to be named "menu"
THe second "No-JS" and is used if you need to separate out elements that are usually displayed using javascript into its own page. Such as the contact form element on the home page.

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
