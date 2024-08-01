import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 500); })

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    type: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData((prevData) => ({ ...prevData, type: value }));
  };

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();

      setSending(true);

      const { nom, prenom, type, email, message } = formData;
      if (!nom || !prenom || !type || !email || !message) {
        onError("Erreur: Tous les champs doivent être remplis.");
        setSending(false);
        return;
      }

      // We try to call mockContactApi
      try {
        await mockContactApi();
        setSending(false);
        onSuccess();
      } catch (err) {
        setSending(false);
        onError("Erreur lors de l'envoi du message.");
      }
    },
    [formData, onSuccess, onError]
  );
  
  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">

          <Field
            name="nom"
            className="capitalize"
            placeholder=""
            label="Nom"
            value={formData.nom}
            onChange={handleChange}
          />
          <Field
            name="prenom"
            className="capitalize"
            placeholder=""
            label="Prénom"
            value={formData.prenom}
            onChange={handleChange}
          />
          <Select
            selection={["Personnel", "Entreprise"]}
            value={formData.type}
            onChange={handleSelectChange}
            label="Personnel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field
            name="email"
            placeholder=""
            label="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">

          <Field
            name="message"
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
            value={formData.message}
            onChange={handleChange}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
}

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
}

export default Form;
