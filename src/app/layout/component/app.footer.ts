import { Component } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-footer',
   template: `<div class="layout-footer">
         <p class="site-footer__bottom-text">
             جميع الحقوق محفوظة &copy;
            <script>
                document.write(new Date().getFullYear());
            </script>
            <a href="#">جامعة الاقصر </a>
            {{ currentYear }}

         </p>
     </div>`
})
export class AppFooter {

        currentYear = new Date().getFullYear();

}