"use strict";
const get = require("lodash/get");

class Emails {
  constructor() {}

  GetTimestamp() {
    let date = new Date();
    let options = {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };

    return date.toLocaleTimeString("en-us", options);
  }

  Personel({ messages = [] }) {
    return `

<html>
<head>
 <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width" />
    <title></title>
    <style>
        p, ul, li {
            font-family: sans-serif;
            font-size: 15px;
            font-weight: normal;
            margin: 0;
            margin-bottom: 15px;
            line-height: 145%;
            color: black!important;
        }
        a {
            font-family: sans-serif;
            font-size: 15px;
            text-decoration: underline;
            line-height: 145%;
            margin-top: 10px;
            margin-bottom: 10px;
        }
    </style>
  </head>
  <body>
  <p>

  ${messages.join(`</p><p>`)}

  </p>

  <br>
  <div>



      <table style="color:rgb(0,0,0);font-family:&quot;Times New Roman&quot;;font-size:medium"><tbody>
      <tr>
      <td align="left" style="margin-right:30px;">
        <img src="https://pbs.twimg.com/profile_images/1360831646107336704/D2wEMMUD_400x400.jpg" style="width:50px; margin-right:20px; border-radius: 50%!important;"></td><td><span style="background-color:rgb(255,255,255)">
        <span style="margin-bottom: -10px!important;"><p>Kyouko<br>
        <span color="#999999">App Developer<br></span>
          </p></span>
        </span></td></tr></tbody></table>
  <div dir="ltr"><div><div dir="ltr"><br>
   <table style="color:rgb(0,0,0);font-family:&quot;Times New Roman&quot;;font-size:medium"><tbody><tr>
    <td align="left"><a href="https://disputecore.com" target="_blank"><img alt="disputecore" border="0" src="https://disputecore.com/logos/email-logo.png" style="max-width:150px;border:0px;padding:0px;margin:auto"></a><br><p></p><div>
      <p>Recover your money from customer disputes and lost shipments<br>Text us at +1 (866) 217-1477</p></div><div><p><br>

      </p></div></td></tr></tbody></table></div></div></div></div>



<p></p>
</body>
</html>
`;
  }

  Notification({
    headline = ``, // email headline
    email_preview = false, // showin in the preview section of gmail
    bullets = [], // headline bullets, great for three pointers
    button = false, // clickable button, requires .url .text
    body = ``, // Body of th email
    lists = [], // Lists includes lists of items to highlight like addresses, or included order items
    disclaimer = "", // Mention why the customer is getting the email
    footer_list = [], // List of messages on the bottom of the email
    store_name = "", // used for support
    support_email = false, // used to trigger support vlock
    support_phone = false, // support phone, optional
    note = false, // Optional note to write customers messages via CLI
  }) {
    let prerenderedList = [];
    let prerenderedFooter = [];

    footer_list.map((item) => {
      if (item && item != "") {
        prerenderedFooter.push(`<tr>
        <td class="Spacer Spacer--gutter" width="50" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;color: #ffffff;font-size: 1px;line-height: 1px;mso-line-height-rule: exactly;">&nbsp;</td>
        <td class="Content Footer-legal Font Font--caption Font--mute" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;width: 472px;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif;mso-line-height-rule: exactly;vertical-align: middle;color: #16162b;font-size: 12px;line-height: 16px;">
          ${item}
        </td>
        <td class="Spacer Spacer--gutter" width="64" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;color: #ffffff;font-size: 1px;line-height: 1px;mso-line-height-rule: exactly;">&nbsp;</td>
      </tr>`);
      }
    });

    bullets = bullets.map(({ headline, content }) => {
      return ` <td class="DataBlocks-item" valign="top" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;">
        <table style="border: 0;border-collapse: collapse;margin: 0;padding: 0;">
          <tbody>
            <tr>
              <td class="Font Font--caption Font--uppercase Font--mute Font--noWrap" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif;mso-line-height-rule: exactly;vertical-align: middle;color: #16162b;font-size: 12px;line-height: 16px;white-space: nowrap;font-weight: bold;text-transform: uppercase;">
                ${headline}
              </td>
            </tr>
            <tr>
              <td class="Font Font--body Font--noWrap" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif;mso-line-height-rule: exactly;vertical-align: middle;color: #16162b;font-size: 15px;line-height: 24px;white-space: nowrap;">
              ${content}
              </td>
            </tr>
          </tbody>
        </table>
      </td>
      <td class="Spacer DataBlocks-spacer" width="20" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;color: #ffffff;font-size: 1px;line-height: 1px;mso-line-height-rule: exactly;">&nbsp;</td>
      `;
    });

    let headline_bullets = bullets.join("");

    lists.map((block) => {
      if (!block.list) return;

      let intenalList = [];

      block.list.map((item) => {
        intenalList.push(`<tr>
        <td class="Table-description Font Font--body" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif;mso-line-height-rule: exactly;vertical-align: middle;color: #16162b;font-size: 15px;line-height: 24px;">
           <div style="">${item}</div></td></tr>`);
      });

      prerenderedList.push(`
      <table class="Section Copy" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;background-color: #ffffff;">
      <tbody>
         <tr>
            <td class="Spacer Spacer--gutter" width="64" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;color: #ffffff;font-size: 1px;line-height: 1px;mso-line-height-rule: exactly;">&nbsp;</td>
            <td  class="Content Font Font--caption Font--uppercase Font--mute Delink" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;width: 472px;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif;mso-line-height-rule: exactly;vertical-align: middle;color: #16162b;font-size: 12px;line-height: 16px;font-weight: bold;text-transform: uppercase;">
              ${block.headline}
            </td>
            <td class="Spacer Spacer--gutter" width="64" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;color: #ffffff;font-size: 1px;line-height: 1px;mso-line-height-rule: exactly;">&nbsp;</td>
         </tr>
         <tr>
            <td class="Spacer Spacer--divider" colspan="3" height="12" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;color: #ffffff;font-size: 1px;line-height: 1px;mso-line-height-rule: exactly;">&nbsp;</td>
         </tr>
      </tbody>
     </table>


     <table class="Section Table" width="100%" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;background-color: #ffffff;">
      <tbody>
         <tr>
            <td class="Spacer Spacer--kill" width="20" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;color: #ffffff;font-size: 1px;line-height: 1px;mso-line-height-rule: exactly;">&nbsp;</td>
            <td class="Content" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;">
               <table class="Table-body" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;width: 100%;background-color: #f6f9fc;border-radius: 4px;">
                  <tbody>
                     <tr>
                        <td class="Spacer Spacer--divider" colspan="3" height="4" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;color: #ffffff;font-size: 1px;line-height: 1px;mso-line-height-rule: exactly;">&nbsp;</td>
                     </tr>
                     <tr>
                        <td class="Spacer Spacer--gutter" width="20" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;color: #ffffff;font-size: 1px;line-height: 1px;mso-line-height-rule: exactly;">&nbsp;</td>
                        <td class="Table-content" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;">
                           <table  class="Table-rows" style="border: 0;border-collapse: collapse;margin: 0;padding: 0; width: 100%;">
                              <tbody>
                                 <tr>
                                    <td class="Table-divider Spacer" colspan="3" height="6" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;color: #ffffff;font-size: 1px;line-height: 1px;mso-line-height-rule: exactly;">&nbsp;</td>
                                 </tr>


                             ${intenalList.join("")}

                                 <tr>
                                    <td class="Table-divider Spacer" colspan="3" height="6" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;color: #ffffff;font-size: 1px;line-height: 1px;mso-line-height-rule: exactly;">&nbsp;</td>
                                 </tr>
                              </tbody>
                           </table>
                        </td>
                        <td class="Spacer Spacer--gutter" width="20" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;color: #ffffff;font-size: 1px;line-height: 1px;mso-line-height-rule: exactly;">&nbsp;</td>
                     </tr>
                     <tr>
                        <td class="Spacer Spacer--divider" colspan="3" height="4" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;color: #ffffff;font-size: 1px;line-height: 1px;mso-line-height-rule: exactly;">&nbsp;</td>
                     </tr>
                  </tbody>
               </table>
            </td>
            <td class="Spacer Spacer--kill" width="20" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;color: #ffffff;font-size: 1px;line-height: 1px;mso-line-height-rule: exactly;">&nbsp;</td>
         </tr>
      </tbody>
     </table>

     <table class="Section Divider" width="100%" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;background-color: #ffffff;">
      <tbody>
         <tr>
            <td class="Spacer Spacer--divider" height="32" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;color: #ffffff;font-size: 1px;line-height: 1px;mso-line-height-rule: exactly;">&nbsp;</td>
         </tr>
      </tbody>
     </table>

     `);
    });

    return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional" "https://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
     <html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en" style="margin: 0;padding: 0;border: 0;">
       <head>
         <title>${headline}</title>
         <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
         <meta name="viewport" content="width=device-width">
         <meta name="robots" content="noindex, nofollow">
         <meta name="googlebot" content="noindex, nofollow, noarchive">
         <style type="text/css">
           img + div {
           display: none !important;
           /* Hides image downloading in Gmail */
           }
           @media screen and (max-width: 600px) {
           /** Gmail **/
           *[class="Gmail"] {
           display: none !important
           }
           /** Wrapper **/
           .Wrapper {
           max-width: 600px !important;
           min-width: 320px !important;
           width: 100% !important;
           border-radius: 0 !important;
           }
           .Section {
           width: 100% !important;
           }
           .Section--last {
           border-bottom-left-radius: 0 !important;
           border-bottom-right-radius: 0 !important;
           }
           /** Notice **/
           .Notice {
           border-bottom-left-radius: 0 !important;
           border-bottom-right-radius: 0 !important;
           }
           /** Header **/
           .Header .Header-left,
           .Header .Header-right {
           border-top-left-radius: 0 !important;
           border-top-right-radius: 0 !important;
           }
           /** Content **/
           .Content {
           width: auto !important;
           }
           /** Divider **/
           .Divider--kill {
           display: none !important;
           height: 0 !important;
           width: 0 !important;
           }
           /** Spacer **/
           .Spacer--gutter {
           width: 20px !important;
           }
           /*.Spacer--kill {
           height: 0 !important;
           width: 0 !important;
           }*/
           .Spacer--emailEnds {
           height: 0 !important;
           }
           /** Target **/
           .Target img {
           /*display: none !important;
           height: 0 !important;
           margin: 0 !important;
           max-height: 0 !important;
           min-height: 0 !important;
           mso-hide: all !important;
           padding: 0 !important;
           width: 0 !important;*/
           font-size: 0 !important;
           line-height: 0 !important;
           }
           .Target::before {
           content: '' !important;
           display: block !important;
           }
           /** Header **/
           .Header-area {
           width: 100% !important;
           }
           .Header-left,
           .Header-left::before,
           .Header-right,
           .Header-right::before {
           /*height: 156px !important;*/
           width: auto !important;
           background-size: 252px 156px !important;
           }
           .Header-left {
           background-position: bottom right !important;
           }
           .Header-right {
           background-image: url('https://stripe-images.s3.amazonaws.com/notifications/hosted/20180110/Header/Right.png') !important;
           background-position: bottom left !important;
           }
           .Header-icon,
           .Header-icon::before {
           width: 96px !important;
           height: 156px !important;
           background-size: 96px 156px !important;
           }
           .Header-icon {
           width: 96px !important;
           height: 156px !important;
           background-image: url('https://stripe-images.s3.amazonaws.com/emails/acct_1AtRHVLrfrJRnR7Z/1/twelve_degree_icon@2x.png') !important;
           background-position: bottom center !important;
           }
           /** Table **/
           .Table-content {
           width: auto !important;
           }
           .Table-rows {
           width: 100% !important;
           }
           }
           @media screen and (max-width: 599px) {
           /** Data Blocks **/
           .DataBlocks-item {
           display: block !important;
           width: 100% !important;
           }
           .DataBlocks-spacer {
           display: block !important;
           height: 12px !important;
           width: auto !important;
           }
           }
         </style>
       </head>
       <body class="Email" style="margin: 0;padding: 0;border: 0;background-color: #f1f5f9;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;min-width: 100% !important;width: 100% !important;">
         <title>magicsoaps</title>
         <div style="display:none;font-size:1px;color:#333333;line-height:10px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
           ${email_preview ? email_preview : headline}
         </div>


         <!-- Insert &zwnj;&nbsp; hack after hidden preview text -->
        <div style="display: none; max-height: 0px; overflow: hidden;">
        &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
        &nbsp;&zwnj;&nbsp;&zwnj;&nbsp; &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
        &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp; &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
        &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
        &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
        &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp; &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
        &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp; &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
        &nbsp;&zwnj;&nbsp;&zwnj;&nbsp; &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
        &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp; &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
        &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
        &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
        &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp; &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
        &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
        </div>

         <div class="Preheader" style="display: none !important;max-height: 0;max-width: 0;mso-hide: all;overflow: hidden;color: #ffffff;font-size: 1px;line-height: 1px;opacity: 0;visibility: hidden;">-</div>
         <div class="Background" style="min-width: 100%;width: 100%;background-color: #f1f5f9;">
           <table class="Wrapper" align="center" style="border: 0;border-collapse: collapse;margin: 0 auto !important;padding: 0;max-width: 420px;min-width: 420px;width: 420px;">
             <tbody>
               <tr>
                 <td style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;">
                   <table class="Divider Divider--small Divider--kill" width="100%" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;">
                     <tbody>
                       <tr>
                         <td class="Spacer Spacer--divider" height="20" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;color: #ffffff;font-size: 1px;line-height: 1px;mso-line-height-rule: exactly;">&nbsp;</td>
                       </tr>
                     </tbody>
                   </table>
                   <div class="Shadow" style="border-bottom-left-radius: 5px;border-bottom-right-radius: 5px;box-shadow: 0 7px 14px 0 rgba(50,50,93,0.10), 0 3px 6px 0 rgba(0,0,0,0.07);">
                     <table dir="ltr" class="Section Header" width="100%" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;background-color: #ffffff;">
                       <tbody>
                         <tr>
                           <td class="Header-left Target" style="background-color: #5D003B;border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;font-size: 0;line-height: 0px;mso-line-height-rule: exactly;background-size: 100% 100%;border-top-left-radius: 5px;border-top-right-radius: 5px;" align="right" valign="bottom" width="252">
                             <img id='primary-email-logo' src='https://disputecore.com/logos/email-logo.png' width="250" height='auto' style='display: table-cell;vertical-align: middle; text-align: center; margin: auto; padding-top: 30px; padding-bottom: 30px; max-height: 50px; width: auto;'>
                           </td>
                       </tbody>
                     </table>
                     <table class="Section Title" width="100%" style="border: 0;border-collapse: initial;margin: 0;padding: 0; padding-top: 10px;background-color: #ffffff;">
                       <tbody>
                         <tr>
                           <td class="Spacer Spacer--gutter" width="64" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;color: #ffffff;font-size: 1px;line-height: 1px;mso-line-height-rule: exactly;">&nbsp;</td>
                           <td class="Content Title-copy Font Font--title" align="center" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;width: 472px;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif;mso-line-height-rule: exactly;vertical-align: middle;color: #16162b;font-size: 23px;line-height: 38px;">
                             ${headline}
                           </td>
                           <td class="Spacer Spacer--gutter" width="64" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;color: #ffffff;font-size: 1px;line-height: 1px;mso-line-height-rule: exactly;">&nbsp;</td>
                         </tr>
                       </tbody>
                     </table>
                     <table class="Section Divider" width="100%" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;background-color: #ffffff;">
                       <tbody>
                         <tr>
                           <td class="Spacer Spacer--divider" height="8" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;color: #ffffff;font-size: 1px;line-height: 1px;mso-line-height-rule: exactly;">&nbsp;</td>
                         </tr>
                       </tbody>
                     </table>
                     <table class="Section Title" width="100%" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;background-color: #ffffff;">
                       <tbody>
                         <tr>
                           <td class="Spacer Spacer--gutter" width="64" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;color: #ffffff;font-size: 1px;line-height: 1px;mso-line-height-rule: exactly;">&nbsp;</td>
                           <td class="Content Title-copy Font Font--title" align="center" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;width: 472px;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif;mso-line-height-rule: exactly;vertical-align: middle;color: #16162b;font-size: 14px;line-height: 12px;">
                             ${this.GetTimestamp()}
                           </td>
                           <td class="Spacer Spacer--gutter" width="64" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;color: #ffffff;font-size: 1px;line-height: 1px;mso-line-height-rule: exactly;">&nbsp;</td>
                         </tr>
                       </tbody>
                     </table>
                     <table class="Section Divider" width="100%" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;background-color: #ffffff;">
                       <tbody>
                         <tr>
                           <td class="Spacer Spacer--divider" height="24" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;color: #ffffff;font-size: 1px;line-height: 1px;mso-line-height-rule: exactly;">&nbsp;</td>
                         </tr>
                       </tbody>
                     </table>
                     <table class="Section DataBlocks" width="100%" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;background-color: #ffffff;width: 100%;">
                       <tbody>
                         <tr>
                           <td class="Spacer Spacer--gutter" width="64" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;color: #ffffff;font-size: 1px;line-height: 1px;mso-line-height-rule: exactly;">&nbsp;</td>
                           <td class="Content" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;width: 472px;">
                             <table class="DataBlocks DataBlocks--three" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;width: 100%;">
                               <tbody>
                                 <tr>
                                 ${headline_bullets}
                                 </tr>
                               </tbody>
                             </table>
                           </td>
                           <td class="Spacer Spacer--gutter" width="64" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;color: #ffffff;font-size: 1px;line-height: 1px;mso-line-height-rule: exactly;">&nbsp;</td>
                         </tr>
                       </tbody>
                     </table>
                     ${
                       button && button != false && get(button, "url", false)
                         ? `<table class="Section Divider" width="100%" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;background-color: #ffffff;">
                     <tbody>
                       <tr>
                         <td class="Spacer Spacer--divider" height="32" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;color: #ffffff;font-size: 1px;line-height: 1px;mso-line-height-rule: exactly;">&nbsp;</td>
                       </tr>
                     </tbody>
                   </table>
                   <table class="Section Button" width="100%" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;background-color: #ffffff;width: 100%;">
                     <tbody>
                       <tr>
                         <td class="Spacer Spacer--gutter" width="64" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;color: #ffffff;font-size: 1px;line-height: 1px;mso-line-height-rule: exactly;">&nbsp;</td>
                         <td class="Content" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;width: 472px;">
                           <table class="Button" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;width: 100%;">
                             <tbody>
                               <tr>
                                 <td class="Button-area" align="center" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;height: 36px;width: 100%;background-color: #6772e5;border-radius: 5px;">
                                   <a class="Button-source" href="${button.url.trim()}" style="-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;outline: 0;text-decoration: none;display: block;padding: 8px;border: 1px solid #6772e5;border-radius: 5px;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif;font-size: 14px;font-weight: 500;line-height: 20px;mso-line-height-rule: exactly;text-align: center;vertical-align: middle;white-space: nowrap;color: #ffffff !important;">
                                  ${button.text}
                                   </a>
                                 </td>
                               </tr>
                             </tbody>
                           </table>
                         </td>
                         <td class="Spacer Spacer--gutter" width="64" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;color: #ffffff;font-size: 1px;line-height: 1px;mso-line-height-rule: exactly;">&nbsp;</td>
                       </tr>
                     </tbody>
                   </table>

                   <table class="Section Divider Divider--large" width="100%" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;background-color: #ffffff;">
                   <tbody>
                     <tr>
                       <td class="Spacer Spacer--divider" height="20" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;color: #ffffff;font-size: 1px;line-height: 1px;mso-line-height-rule: exactly;">&nbsp;</td>
                     </tr>
                   </tbody>
                 </table>
                 `
                         : ""
                     }

                     ${
                       note
                         ? `<table class="Section Note" width="100%" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;background-color: #ffffff;">
                     <tbody>
                       <tr>
                         <td class="Spacer Spacer--gutter" width="32" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;color: #ffffff;font-size: 1px;line-height: 1px;mso-line-height-rule: exactly;">&nbsp;</td>
                         <td class="Note-copy Font Font--body" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif;mso-line-height-rule: exactly;vertical-align: middle;color: #16162b;font-size: 15px;line-height: 24px;overflow-wrap: break-word;word-wrap: break-word;white-space: pre-line;-ms-word-break: break-all;word-break: break-all;word-break: break-word;-ms-hyphens: auto;-moz-hyphens: auto;-webkit-hyphens: auto;hyphens: auto;">
                         ${note}
                         </td>
                         <td class="Spacer Spacer--gutter" width="32" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;color: #ffffff;font-size: 1px;line-height: 1px;mso-line-height-rule: exactly;">&nbsp;</td>
                       </tr>
                     </tbody>
                   </table>
                   <table class="Section Divider" width="100%" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;background-color: #ffffff;">
                     <tbody>
                       <tr>
                         <td class="Spacer Spacer--divider" height="15" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;color: #ffffff;font-size: 1px;line-height: 1px;mso-line-height-rule: exactly;">&nbsp;</td>
                       </tr>
                     </tbody>
                   </table>`
                         : ""
                     }

                     <table class="Section Note" width="100%" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;background-color: #ffffff;">
                       <tbody>
                         <tr>
                           <td class="Spacer Spacer--gutter" width="32" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;color: #ffffff;font-size: 1px;line-height: 1px;mso-line-height-rule: exactly;">&nbsp;</td>
                           <td class="Note-copy Font Font--body" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif;mso-line-height-rule: exactly;vertical-align: middle;color: #16162b;font-size: 15px;line-height: 24px;overflow-wrap: break-word;word-wrap: break-word;white-space: pre-line;-ms-word-break: break-all;word-break: break-all;word-break: break-word;-ms-hyphens: auto;-moz-hyphens: auto;-webkit-hyphens: auto;hyphens: auto;">
                           ${body}
                           </td>
                           <td class="Spacer Spacer--gutter" width="32" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;color: #ffffff;font-size: 1px;line-height: 1px;mso-line-height-rule: exactly;">&nbsp;</td>
                         </tr>
                       </tbody>
                     </table>
                     <table class="Section Divider" width="100%" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;background-color: #ffffff;">
                       <tbody>
                         <tr>
                           <td class="Spacer Spacer--divider" height="32" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;color: #ffffff;font-size: 1px;line-height: 1px;mso-line-height-rule: exactly;">&nbsp;</td>
                         </tr>
                       </tbody>
                     </table>

                      ${prerenderedList.join("")}

                      ${
                        support_email
                          ? ` <table class="Section Copy" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;background-color: #ffffff;">
                      <tbody>
                        <tr>
                          <td class="Spacer Spacer--gutter" width="64" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;color: #ffffff;font-size: 1px;line-height: 1px;mso-line-height-rule: exactly;">&nbsp;</td>
                          <td class="Content Footer-help Font Font--body" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;width: 472px;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif;mso-line-height-rule: exactly;vertical-align: middle;color: #16162b;font-size: 15px;line-height: 24px;">
                          If you have any questions, contact ${store_name} at <a href="mailto:${support_email}" style="white-space: nowrap;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;outline: 0;text-decoration: none;color: #3297d3;">hey@magicsoaps.com</a> ${
                              support_phone
                                ? `or call them at ${support_phone}`
                                : ""
                            }.
                          </td>
                          <td class="Spacer Spacer--gutter" width="64" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;color: #ffffff;font-size: 1px;line-height: 1px;mso-line-height-rule: exactly;">&nbsp;</td>
                        </tr>
                      </tbody>
                    </table>

                    <table class="Section Divider" width="100%" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;background-color: #ffffff;">
                    <tbody>
                      <tr>
                        <td class="Spacer Spacer--divider" height="16" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;color: #ffffff;font-size: 1px;line-height: 1px;mso-line-height-rule: exactly;">&nbsp;</td>
                      </tr>
                    </tbody>
                  </table>
                  <table class="Section Divider" width="100%" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;background-color: #ffffff;">
                    <tbody>
                      <tr>
                        <td class="Spacer Spacer--divider" height="16" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;color: #ffffff;font-size: 1px;line-height: 1px;mso-line-height-rule: exactly;">&nbsp;</td>
                      </tr>
                    </tbody>
                  </table>`
                          : ""
                      }




                     <table class="Section Separator" width="100%" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;background-color: #ffffff;">
                       <tbody>
                         <tr>
                           <td class="Spacer Spacer--gutter" width="64" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;color: #ffffff;font-size: 1px;line-height: 1px;mso-line-height-rule: exactly;">&nbsp;</td>
                           <td class="Spacer" bgcolor="e6ebf1" height="1" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;color: #ffffff;font-size: 1px;line-height: 1px;mso-line-height-rule: exactly;">&nbsp;</td>
                           <td class="Spacer Spacer--gutter" width="50" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;color: #ffffff;font-size: 1px;line-height: 1px;mso-line-height-rule: exactly;">&nbsp;</td>
                         </tr>
                       </tbody>
                     </table>

                     <table class="Section Divider Divider--small" width="100%" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;background-color: #ffffff;">
                       <tbody>
                         <tr>
                           <td class="Spacer Spacer--divider" height="20" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;color: #ffffff;font-size: 1px;line-height: 1px;mso-line-height-rule: exactly;">&nbsp;</td>
                         </tr>
                       </tbody>
                     </table>
                     <table class="Section Copy" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;background-color: #ffffff;">
                       <tbody>
                         <tr>
                           <td class="Spacer Spacer--gutter" width="50" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;color: #ffffff;font-size: 1px;line-height: 1px;mso-line-height-rule: exactly;">&nbsp;</td>
                           <td class="Content Footer-legal Font Font--caption Font--mute" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;width: 472px;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif;mso-line-height-rule: exactly;vertical-align: middle;color: #16162b;font-size: 12px;line-height: 16px;">
                           </td>
                           <td class="Spacer Spacer--gutter" width="50" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;color: #ffffff;font-size: 1px;line-height: 1px;mso-line-height-rule: exactly;">&nbsp;</td>
                         </tr>
                       </tbody>
                     </table>
                     <table class="Section Copy" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;background-color: #ffffff;">
                       <tbody>
                         <tr>
                           <td class="Spacer Spacer--gutter" width="50" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;color: #ffffff;font-size: 1px;line-height: 1px;mso-line-height-rule: exactly;">&nbsp;</td>
                           <td class="Content Footer-legal Font Font--caption Font--mute" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;width: 472px;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif;mso-line-height-rule: exactly;vertical-align: middle;color: #16162b;font-size: 12px;line-height: 16px;">
                            ${disclaimer}
                           </td>
                           <td class="Spacer Spacer--gutter" width="50" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;color: #ffffff;font-size: 1px;line-height: 1px;mso-line-height-rule: exactly;">&nbsp;</td>
                         </tr>
                       </tbody>
                     </table>

                    <table class="Section Divider Divider--small" width="100%" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;background-color: #ffffff;">
                       <tbody>
                         <tr>
                           <td class="Spacer Spacer--divider" height="20" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;color: #ffffff;font-size: 1px;line-height: 1px;mso-line-height-rule: exactly;">&nbsp;</td>
                         </tr>
                       </tbody>
                     </table>

                     <table class="Section Copy" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;background-color: #ffffff;">
                       <tbody>

                        ${prerenderedFooter.join(
                          `<td class="Spacer Spacer--divider" height="10" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;color: #ffffff;font-size: 1px;line-height: 1px;mso-line-height-rule: exactly;">&nbsp;</td>`
                        )}

                       </tbody>
                     </table>

                     <table class="Section Section--last Divider Divider--large" width="100%" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;background-color: #ffffff;border-bottom-left-radius: 5px;border-bottom-right-radius: 5px;">
                       <tbody>
                         <tr>
                           <td class="Spacer Spacer--divider" height="32" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;color: #ffffff;font-size: 1px;line-height: 1px;mso-line-height-rule: exactly;">&nbsp;</td>
                         </tr>
                       </tbody>
                     </table>
                   </div>
           </table>
         </div>
         </td>
         </tr>
         </tbody>
         </table>
         <table class="Divider Divider--small Divider--kill" width="100%" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;">
           <tbody>
             <tr>
               <td class="Spacer Spacer--divider" height="20" style="border: 0;border-collapse: collapse;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;color: #ffffff;font-size: 1px;line-height: 1px;mso-line-height-rule: exactly;">&nbsp;</td>
             </tr>
           </tbody>
         </table>
         </div>
       </body>
     </html>
     `;
  }

  Internal({ username, name, phone, message, email, tracking }) {
    return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
    <html>
      <head>
       <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width" />
        <title>${username}</title>
        <style>
            p, ul, li {
                font-family: sans-serif;
                font-size: 15px;
                font-weight: normal;
                margin: 0;
                margin-bottom: 15px;
                line-height: 145%;
                color: black;
            }

            p.subtext {
              font-size: 11px!important;
              color: grey!important;
            }

            a {
                font-family: sans-serif;
                font-size: 15px;
                text-decoration: underline;
                line-height: 145%;
                margin-top: 10px;
                margin-bottom: 10px;
            }
        </style>
    </head>
    <body>
      <p>${name} asked a question about DisputeCore.com</p>
      <p>Their phone number is ${phone}, reply-to ${email}.</p>
      ${
        tracking &&
        `<p>They attached the following tracking number, ${tracking}.</p>`
      }
      <p>${message}</p>

    </body>
    </html>
`;
  }

  Outgoing({ messages = [], domain }) {
    return `
      <html>
      <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width" />
          <title></title>
          <style>
              p, ul, li {
                  font-family: sans-serif;
                  font-size: 15px;
                  font-weight: normal;
                  margin: 0;
                  margin-bottom: 15px;
                  line-height: 145%;
                  color: black!important;
              }
              a {
                  font-family: sans-serif;
                  font-size: 15px;
                  text-decoration: underline;
                  line-height: 145%;
                  margin-top: 10px;
                  margin-bottom: 10px;
              }
          </style>
        </head>
        <body>
        <p>

        ${messages.join(`</p><p>`)}

        </p>

        <br>
        <div>

        <div dir="ltr"><div><div dir="ltr"><br>
        <table style="color:rgb(0,0,0);font-family:&quot;Times New Roman&quot;;font-size:medium"><tbody><tr>
        <td align="left"><a href="${domain}" target="_blank"><img alt="disputecore" border="0" src="https://disputecore.com/logos/email-logo.png" style="max-width:150px;border:0px;padding:0px;margin:auto"></a><br><p></p><div>
        <p>This is a reply to the video message you sent us.<br>${domain}?utm_source=honestycore</p></div><div><p><br>
        </p></div></td></tr></tbody></table></div></div></div></div>

      <p></p>
      </body>
      </html>
    `;
  }
}

module.exports = Emails;
