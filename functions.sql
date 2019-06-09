CREATE FUNCTION auth(VARCHAR(30),VARCHAR(30))
  RETURNS boolean AS $authenticated$
DECLARE
  authenticated BOOLEAN;
	l VARCHAR(30);
	log ALIAS FOR $1;
	p VARCHAR(30);
	pas ALIAS FOR $2;
  BEGIN
  SELECT COALESCE(NULLIF(login,'')),COALESCE(NULLIF(pass,'')) INTO l,p FROM account;
  IF(l LIKE log AND p LIKE pas)
		THEN RETURN true;
	ELSE
		RETURN false;
	END IF;
 END;
 $authenticated$ LANGUAGE plpgsql;

CREATE FUNCTION convExists(INT)
	RETURNS boolean AS $ex$
DECLARE
	ex BOOLEAN;
	i ALIAS FOR $1;
	ii INT;
	BEGIN
		SELECT id INTO ii FROM conversation WHERE id=i;
		IF(ii)
			THEN RETURN true;
		ELSE
			RETURN false;
		END IF;
	END;
	$ex$ LANGUAGE plpgsql;
