package com.developerex.server.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.time.LocalDateTime;

public class FutureFetchTimeValidator implements ConstraintValidator<FutureFetchTime, LocalDateTime> {
    @Override
    public void initialize(FutureFetchTime constraintAnnotation) {
    }

    @Override
    public boolean isValid(LocalDateTime value, ConstraintValidatorContext context) {
        return value != null && value.isAfter(LocalDateTime.now().minusSeconds(5));
    }
}
