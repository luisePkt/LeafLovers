import { useNavigate } from "react-router-dom";
import style from "../styles/legal.module.css";

const LegalNotice = () => {
  const navigate = useNavigate();

  return (
    <div className={style.main}>
      <div className={style.wrapper}>
        <h2>Legal Notice</h2>
        <h3>Disclaimer of Liability</h3>
        <p>
          The content of our website has been created with the utmost care.
          However, we cannot guarantee the accuracy, completeness, or timeliness
          of the content. The plants and their displayed information are purely
          fictive, except for the photographic material. As a service provider,
          we are responsible for our own content on these pages in accordance
          with general laws pursuant to § 7 Abs.1 TMG. According to §§ 8 to 10
          TMG, we are not obligated to monitor transmitted or stored external
          information or to investigate circumstances that indicate illegal
          activity. Obligations to remove or block the use of information under
          general laws remain unaffected. However, liability in this regard is
          only possible from the point in time when a concrete infringement
          becomes known. Upon notification of such violations, we will remove
          the content immediately.
        </p>
        <h3>External Link Disclaimer</h3>
        <p>
          Our offer contains links to external websites of third parties, on
          whose contents we have no influence. Therefore, we cannot assume any
          liability for these external contents. The respective provider or
          operator of the pages is always responsible for the content of the
          linked pages. The linked pages were checked for possible legal
          violations at the time of linking. Illegal contents were not
          recognizable at the time of linking. Permanent control of the contents
          of the linked pages is not reasonable without concrete evidence of an
          infringement. Upon notification of violations, we will remove such
          links immediately.
        </p>
        <h3>Copyright</h3>
        <p>
          The content and works created by the site operators on these pages are
          subject to German copyright law. The duplication, processing,
          distribution, and any kind of utilization outside the limits of
          copyright require the written consent of the respective author or
          creator. Downloads and copies of this site are only permitted for
          private, non-commercial use. Insofar as the content on this site was
          not created by the operator, the copyrights of third parties are
          respected. In particular, third-party content is marked as such.
          Should you become aware of a copyright infringement, please inform us
          accordingly. Upon notification of violations, we will remove such
          content immediately.
        </p>
        <h3>Source of Images</h3>
        <p>
          All photographic material used on this site is sourced from the
          Pixabay API.
        </p>
        <h3>Privacy Policy</h3>
        <p>
          The use of our website is generally possible without providing
          personal data. We do not process any personal data of our users. Any
          data collected (such as IP addresses) are anonymized and cannot be
          used to identify individuals. If you have any questions regarding our
          data practices, please feel free to contact us.
        </p>
        <button onClick={() => navigate(-1)}>Go back</button>
      </div>
    </div>
  );
};

export default LegalNotice;
