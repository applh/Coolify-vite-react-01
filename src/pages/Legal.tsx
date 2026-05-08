import { SEO } from "../components/SEO";

export function Legal() {
  return (
    <>
      <SEO 
        title="Mentions Légales" 
        description="Mentions légales obligatoires (Legal Mentions)."
      />
      <div className="max-w-3xl mx-auto px-6 py-24 flex-1 w-full prose prose-invert prose-primary max-w-none">
        <h1 className="font-display text-4xl font-bold tracking-tight mb-8">Mentions Légales</h1>
        
        <h2>1. Éditeur du site</h2>
        <p>
          Le présent site, accessible à l’URL <strong>https://yourdomain.com</strong> (le « Site »), est édité par :
        </p>
        <p>
          <strong>CoolifyStarter Inc.</strong>, société au capital de 10 000 euros,
          inscrite au R.C.S. de Paris sous le numéro 123 456 789,<br />
          dont le siège social est situé au 123 Open Source Ave, San Francisco, CA 94107, USA.
        </p>
        
        <h2>2. Directeur de la publication</h2>
        <p>Le Directeur de la publication du Site est John Doe.</p>

        <h2>3. Hébergement</h2>
        <p>
          Le Site est hébergé par la société <strong>Hetzner Online GmbH</strong>,<br />
          située Industriestr. 25, 91710 Gunzenhausen, Allemagne,<br />
          contact téléphonique : +49 (0)9831 505-0.
        </p>

        <h2>4. Nous contacter</h2>
        <ul>
          <li>Par email : <a href="mailto:hello@coolifystarter.com">hello@coolifystarter.com</a></li>
          <li>Par courrier : 123 Open Source Ave, San Francisco, CA 94107, USA</li>
        </ul>

        <h2>5. Données personnelles</h2>
        <p>
          Le traitement de vos données à caractère personnel est régi par notre Charte du respect de la vie privée (Privacy Policy), disponible depuis la section "Privacy Policy", conformément au Règlement Général sur la Protection des Données 2016/679 du 27 avril 2016 («RGPD»).
        </p>
      </div>
    </>
  );
}
