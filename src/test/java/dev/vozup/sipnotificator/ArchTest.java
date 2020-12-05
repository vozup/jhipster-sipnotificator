package dev.vozup.sipnotificator;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {
        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("dev.vozup.sipnotificator");

        noClasses()
            .that()
            .resideInAnyPackage("dev.vozup.sipnotificator.service..")
            .or()
            .resideInAnyPackage("dev.vozup.sipnotificator.repository..")
            .should()
            .dependOnClassesThat()
            .resideInAnyPackage("..dev.vozup.sipnotificator.web..")
            .because("Services and repositories should not depend on web layer")
            .check(importedClasses);
    }
}
